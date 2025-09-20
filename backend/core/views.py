import os
import time
import json
import re
import logging
import requests
from functools import wraps
from typing import Any, Dict, List

from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token
from django_ratelimit.decorators import ratelimit

import google.generativeai as genai
from .utils import api_view
from .models import normalize_email_for_storage
from allauth.socialaccount.models import SocialAccount
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from .tasks import run_blog_automation

User = get_user_model()
log = logging.getLogger(__name__)

# Health check endpoint
def healthz(request):
    return JsonResponse({"ok": True})

class TimedRequest(grequests.Request):
    # google-auth 요청에 기본 timeout을 강제
    def __call__(self, url, method="GET", headers=None, body=None, timeout=6):
        return super().__call__(url, method=method, headers=headers, body=body, timeout=timeout)

def normalize_email(e: str) -> str:
    if not e: return ""
    e = e.strip().lower()
    if e.endswith("@gmail.com") or e.endswith("@googlemail.com"):
        local, domain = e.split("@", 1)
        local = local.split("+", 1)[0].replace(".", "")
        return f"{local}@gmail.com"
    return e

# In-memory stores for content generation (keeping existing functionality)
USER_FILES: Dict[str, Any] = {}
# JOB_STATUS and JOB_RESULTS are now handled by Celery/Redis

BETA_MODE = getattr(settings, 'BETA_MODE', True)

# Configure Gemini if key exists
api_key = os.getenv('GEMINI_API_KEY', '')
if api_key:
    try:
        genai.configure(api_key=api_key)
        print('Gemini API configured')
    except Exception as e:
        print(f'Gemini config error: {e}')

def _json(request):
    try:
        return json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        return {}

def _sanitize_for_logging(data):
    """Remove sensitive information from data before logging"""
    if not isinstance(data, dict):
        return data
    
    sanitized = data.copy()
    sensitive_keys = ['password', 'naver_pw', 'naver_id', 'credential', 'access_token', 'id_token', 'secret']
    
    for key in list(sanitized.keys()):
        if any(sensitive in key.lower() for sensitive in sensitive_keys):
            sanitized[key] = '[REDACTED]'
        elif isinstance(sanitized[key], dict):
            sanitized[key] = _sanitize_for_logging(sanitized[key])
    
    return sanitized

def _ensure_user_session(request):
    """Ensure user is authenticated for content generation features"""
    if request.user.is_authenticated:
        return str(request.user.id)
    
    # BETA_MODE bypass removed for security - authentication now required
    return None

def _extract_keywords_locally(text: str) -> Dict[str, List[str]]:
    import re
    t = (text or '').lower()

    def find(patterns):
        out = []
        for p in patterns:
            out.extend(re.findall(p, t))
        return out

    def clean(keys):
        uniq = list(set(keys))
        return [k for k in uniq if len(k) >= 2][:8]

    product = find([r'제품|상품|서비스|솔루션|플랫폼|앱|시스템|도구|기술|기능', r'개발|제작|생산|제조|판매|운영|관리'])
    customer = find([r'고객|사용자|소비자|고객군|타겟|대상', r'기업|회사|사업자|개인|단체|조직'])
    problem = find([r'문제|어려움|불편|고민|스트레스|부담', r'비용|시간|효율|품질|서비스|지원'])
    demand = find([r'정보|지식|교육|학습|가이드|튜토리얼', r'리뷰|평가|비교|추천|팁|노하우'])
    diff = find([r'특별|차별|독특|혁신|신기술|최신', r'품질|성능|가격|서비스|지원|보장'])

    direct = re.findall(r'[\w가-힣]{2,}', t)[:10]

    return {
        '제품군': clean(product + direct[:3]),
        '고객군': clean(customer + direct[3:6]),
        '고객 문제점': clean(problem + direct[6:9]),
        '콘텐츠 수요 키워드': clean(demand + direct[9:12]),
        '차별화 요소': clean(diff + direct[12:15]),
    }

def _analyze_trend_keywords(keywords: List[str]) -> Dict[str, Any]:
    cleaned = [kw.strip() for kw in keywords if kw and str(kw).strip()]
    if not cleaned:
        return {"error": "분석할 키워드가 없습니다."}

    results = []
    for kw in cleaned[:5]:
        results.append({
            'base_keyword': kw,
            'related_keywords': [f"{kw} 추천", f"{kw} 비교", f"{kw} 리뷰"],
            'search_volume': {'volume': 1000, 'trend': '상승', 'confidence': 0.8},
            'intent': {'primary_intent': '정보', 'confidence': 0.8},
            'trend_score': 75.0,
        })

    sorted_results = sorted(results, key=lambda x: x.get('trend_score', 0), reverse=True)
    high = [r for r in sorted_results if r.get('trend_score', 0) >= 75][:5]
    med = [r for r in sorted_results if 60 <= r.get('trend_score', 0) < 75][:5]
    low = [r for r in sorted_results if r.get('trend_score', 0) < 60][:5]

    return {
        'success': True,
        'results': {
            'high_trend': high,
            'medium_trend': med,
            'low_trend': low,
        },
        'analysis_summary': {
            'total_keywords': len(cleaned),
            'analyzed_keywords': len(results),
            'clusters': 3,
        },
    }

# ============ AUTHENTICATION VIEWS (Django Model Based) ============

@ensure_csrf_cookie
def csrf_token_view(request):
    """Force-generate CSRF token and set cookie"""
    token = get_token(request)
    resp = JsonResponse({'ok': True})
    try:
        resp.set_cookie(
            settings.CSRF_COOKIE_NAME,
            token,
            httponly=False,
            secure=getattr(settings, 'CSRF_COOKIE_SECURE', False),
            samesite=getattr(settings, 'CSRF_COOKIE_SAMESITE', 'Lax'),
            path='/',
        )
    except Exception:
        pass
    return resp

def _normalize_gmail(email: str) -> str:
    e = (email or '').strip().lower()
    if '@gmail.com' in e or '@googlemail.com' in e:
        try:
            local, domain = e.split('@', 1)
        except ValueError:
            return e
        local = local.split('+', 1)[0].replace('.', '')
        return f'{local}@gmail.com'
    return e

@ratelimit(key='ip', rate='10/m', method='POST', block=True)
@require_POST
@csrf_protect
@api_view
def auth_google(request):
    """Google One‑Tap ID token verification → session login via allauth SocialAccount
    Accepts only { credential: <ID_TOKEN> } for secure authentication
    """
    try:
        body = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        raise ValueError('Invalid JSON body')

    credential = (body.get('credential') or '').strip()
    auth_code = (body.get('code') or '').strip()
    
    if not credential and not auth_code:
        raise PermissionError('Google ID token or authorization code is required')

    info = None
    
    if credential:
        # Handle ID token verification with proper timeout and error handling
        from google.auth.exceptions import TransportError
        
        client_id = os.getenv('GOOGLE_CLIENT_ID', '').strip()
        if not client_id:
            raise PermissionError('Google OAuth configuration incomplete')
        
        try:
            req = TimedRequest()
            info = id_token.verify_oauth2_token(credential, req, client_id)
        except TransportError as e:
            # 네트워크/타임아웃/프록시 등 → 503로 분류
            log.warning('Google network error', extra={
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'ip_address': request.META.get('REMOTE_ADDR', ''),
                'error': str(e)
            })
            return JsonResponse({"ok":False,"code":"google_unreachable","message":str(e)}, status=503)
        except ValueError as e:
            # 형식/만료/청중 불일치 → 400
            log.info('Invalid Google ID token', extra={
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'ip_address': request.META.get('REMOTE_ADDR', ''),
                'error': str(e)
            })
            return JsonResponse({"ok":False,"code":"invalid_id_token","message":str(e)}, status=400)
    
    elif auth_code:
        # Handle authorization code flow with proper error handling
        from google.auth.exceptions import TransportError
        
        client_id = os.getenv('GOOGLE_CLIENT_ID', '').strip()
        client_secret = os.getenv('GOOGLE_CLIENT_SECRET', '').strip()
        
        if not client_id or not client_secret:
            raise PermissionError('Google OAuth configuration incomplete')
        
        # Exchange authorization code for tokens
        token_url = 'https://oauth2.googleapis.com/token'
        
        # Use the correct redirect URI that matches Google Console configuration
        # For production/cloud environments, use the actual domain
        origin = request.META.get('HTTP_ORIGIN', 'http://localhost:3000')
        
        # Handle different environments for redirect URI
        if 'localhost' not in origin and 'kilexep' in origin.lower():
            # Production domain - use the actual domain
            redirect_uri = f"{origin}/login"
        elif 'herokuapp' in origin or 'vercel' in origin or 'netlify' in origin:
            # Cloud hosting platforms
            redirect_uri = f"{origin}/login"
        else:
            # Local development - default to localhost:3000
            redirect_uri = "http://localhost:3000/login"
        
        token_data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': auth_code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri,  # Must match OAuth config exactly
        }
        
        try:
            log.info(f'Token exchange request: redirect_uri={redirect_uri}, client_id={client_id[:10]}..., origin={origin}')
            token_response = requests.post(token_url, data=token_data, timeout=6)
            
            if not token_response.ok:
                error_detail = token_response.text
                log.warning(f'Google token exchange failed: {token_response.status_code} {error_detail}')
                raise ValueError(f'Token exchange failed: {error_detail}')
            
            tokens = token_response.json()
            
            if 'id_token' not in tokens:
                raise ValueError('No ID token received from Google')
            
            # Verify the ID token we got from token exchange
            req = TimedRequest()
            info = id_token.verify_oauth2_token(tokens['id_token'], req, client_id)
            
        except (requests.Timeout, requests.ConnectionError, TransportError) as e:
            # 네트워크/타임아웃/프록시 등 → 503로 분류
            log.warning('Google network error during code exchange', extra={
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'ip_address': request.META.get('REMOTE_ADDR', ''),
                'error': str(e)
            })
            return JsonResponse({"ok":False,"code":"google_unreachable","message":str(e)}, status=503)
        except ValueError as e:
            # 형식/만료 등 → 400
            log.info('Invalid authorization code or token', extra={
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'ip_address': request.META.get('REMOTE_ADDR', ''),
                'error': str(e)
            })
            return JsonResponse({"ok":False,"code":"invalid_auth_code","message":str(e)}, status=400)
        except Exception as e:
            log.warning('Google authorization code exchange failed', extra={
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'ip_address': request.META.get('REMOTE_ADDR', ''),
                'error': str(e)
            })
            return JsonResponse({"ok":False,"code":"auth_code_exchange_failed","message":str(e)}, status=400)

    # Process user info
    email = normalize_email(info.get('email', ''))
    sub = (info.get('sub') or '').strip()
    if not email:
        raise ValueError('missing email')
    if not sub:
        raise ValueError('missing sub')

    # Prefer existing SocialAccount by sub
    identity = SocialAccount.objects.filter(provider='google', uid=sub).select_related('user').first()
    if identity:
        user = identity.user
        is_existing_user = True
        # Update user info with latest from Google
        user.first_name = (info.get('name') or '').strip()[:150] or user.first_name
        user.avatar_url = (info.get('picture') or '').strip() or user.avatar_url
        user.save()
    else:
        # Link by email if existing user
        user = User.objects.filter(email__iexact=email).first()
        if user:
            is_existing_user = True
            # Update user info with Google data
            user.first_name = (info.get('name') or '').strip()[:150] or user.first_name
            user.avatar_url = (info.get('picture') or '').strip() or user.avatar_url
            user.save()
        else:
            # Minimal user creation; fill first_name and avatar from info
            user = User.objects.create(
                email=email,
                username=email,
                first_name=(info.get('name') or '').strip()[:150],
                avatar_url=(info.get('picture') or '').strip()
            )
            is_existing_user = False
        SocialAccount.objects.get_or_create(user=user, provider='google', uid=sub)

    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    
    # Log successful authentication
    log.info('User authenticated successfully', extra={
        'user_id': str(user.id),
        'email': user.email,
        'is_existing_user': is_existing_user,
        'user_agent': request.META.get('HTTP_USER_AGENT', ''),
        'ip_address': request.META.get('REMOTE_ADDR', '')
    })
    
    return JsonResponse({
        'ok': True,
        'success': True,
        'is_existing_user': is_existing_user,
        'registration_completed': bool(getattr(user, 'registration_completed', False)),
        'user': {
            'sub': str(user.id),
            'name': user.first_name,
            'email': user.email,
            'picture': user.avatar_url or '',
        }
    })


# Email authentication functions removed - using Google OAuth only

@ratelimit(key='user', rate='5/m', method='POST', block=True)
@require_POST
@csrf_protect
@api_view
def complete_signup(request):
    """Complete user profile"""
    if not request.user.is_authenticated:
        raise PermissionError("Authentication required")
    
    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON body")

    name = (payload.get("name") or "").strip()
    if not name:
        raise ValueError("`name` is required")

    # Update user profile
    user = request.user
    user.first_name = name
    if payload.get("email"):
        user.email = payload.get("email")
        user.email_lower = normalize_email_for_storage(payload.get("email"))
    user.company = payload.get("company", "")
    user.role = payload.get("role", "")
    user.phone = payload.get("phone", "")
    user.registration_completed = True
    user.save()
    
    # Rotate session for security
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')

    return JsonResponse({
        "ok": True,
        "success": True,
        "registration_completed": True,
        "message": "Profile completed successfully"
    })

def get_user_status(request):
    """Get current user status"""
    if request.user.is_authenticated:
        user = request.user
        return JsonResponse({
            'logged_in': True,
            'user': {
                'sub': str(user.id),
                'name': user.first_name,
                'email': user.email,
                'picture': user.avatar_url or '',
            },
            'registration_completed': user.registration_completed
        }, headers={'Cache-Control': 'no-store'})
    return JsonResponse({'logged_in': False}, headers={'Cache-Control': 'no-store'})

@require_POST
@csrf_protect
@api_view
def logout_view(request):
    """Logout user"""
    logout(request)
    return JsonResponse({'success': True, 'message': '로그아웃 완료'})

def debug_echo(request):
    """Debug endpoint to check headers/cookies/session"""
    info = {
        'method': request.method,
        'path': request.path,
        'authenticated': request.user.is_authenticated,
        'user_id': str(request.user.id) if request.user.is_authenticated else None,
        'headers': {k: v for k, v in request.headers.items()},
        'cookies': request.COOKIES,
        'session_key': getattr(request.session, 'session_key', None),
    }
    return JsonResponse(info)

# ============ CONTENT GENERATION VIEWS (Keep existing logic) ============

@ratelimit(key='user', rate='20/h', method='POST', block=True)
@require_POST
@csrf_protect
@api_view
def analyze_onboarding(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    data = _json(request)
    text = (data.get('text') or '').strip()
    if not text:
        return JsonResponse({'error': '분석할 텍스트를 입력해주세요.'}, status=400)
    if len(text) < 50:
        return JsonResponse({'error': '최소 50자 이상 입력해주세요.'}, status=400)

    try:
        if api_key:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = (
                '다음 한국어 온보딩 인터뷰 텍스트에서 핵심 키워드를 추출해 주세요. '
                '반드시 JSON만 출력하세요. 키는 다음과 같습니다: '
                '제품군, 고객군, 고객 문제점, 콘텐츠 수요 키워드, 차별화 요소. '
                '각 값은 최대 8개의 문자열 배열로 제공하세요. 불필요한 설명은 금지합니다.\n\n'
                f'텍스트:\n{text}'
            )
            response = model.generate_content(prompt)
            raw_text = getattr(response, 'text', '') or ''
            cleaned = raw_text.strip()
            if cleaned.startswith('```'):
                cleaned = cleaned.strip('`\n ')
                if cleaned.lower().startswith('json'):
                    cleaned = cleaned[4:].strip()
            try:
                parsed = json.loads(cleaned)
            except Exception:
                parsed = None
            if isinstance(parsed, dict):
                def ensure_list(d, key):
                    v = d.get(key, [])
                    return [str(x) for x in v][:8] if isinstance(v, list) else []
                result = {
                    '제품군': ensure_list(parsed, '제품군'),
                    '고객군': ensure_list(parsed, '고객군'),
                    '고객 문제점': ensure_list(parsed, '고객 문제점'),
                    '콘텐츠 수요 키워드': ensure_list(parsed, '콘텐츠 수요 키워드'),
                    '차별화 요소': ensure_list(parsed, '차별화 요소'),
                }
                return JsonResponse({'success': True, 'result': result})
    except Exception:
        pass

    result = _extract_keywords_locally(text)
    return JsonResponse({'success': True, 'result': result})

@require_POST
@csrf_protect
@api_view
def analyze_trend_keywords(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    data = _json(request)
    keywords = data.get('keywords') or []
    result = _analyze_trend_keywords(keywords)
    if 'error' in result:
        return JsonResponse(result, status=500)
    return JsonResponse(result)

@require_POST
@csrf_protect
@api_view
def generate_content_topics(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    data = _json(request)
    content_options = data.get('content_options', {})

    # Demo trend set
    trend_result = {
        'results': {
            'high_trend': [
                {'base_keyword': 'AI 마케팅', 'trend_score': 95},
                {'base_keyword': '디지털 마케팅', 'trend_score': 88},
                {'base_keyword': '콘텐츠 마케팅', 'trend_score': 82},
            ],
            'medium_trend': [
                {'base_keyword': 'SEO 최적화', 'trend_score': 75},
                {'base_keyword': '소셜미디어 마케팅', 'trend_score': 70},
            ],
            'low_trend': [
                {'base_keyword': '이메일 마케팅', 'trend_score': 60},
                {'base_keyword': '인플루언서 마케팅', 'trend_score': 55},
            ],
        }
    }

    all_keywords = []
    for cat in ['high_trend', 'medium_trend', 'low_trend']:
        all_keywords.extend(trend_result['results'][cat])
    all_keywords.sort(key=lambda x: x.get('trend_score', 0), reverse=True)
    keywords = all_keywords[:5]

    target_audience = content_options.get('targetAudience', '일반 사용자')
    purpose = content_options.get('purpose', '정보제공')

    default_templates = {
        '정보제공': ['완벽 가이드', '기초부터 알아보기', '실용적인 팁'],
        '구매유도': ['추천 TOP 10', '구매 가이드', '가성비 비교'],
        '브랜드 인지도': ['브랜드 스토리', '인기 브랜드 분석', '트렌드 리뷰'],
    }

    import random
    all_topics = []
    for i, kw in enumerate(keywords):
        base_keyword = kw.get('base_keyword', '')
        templates = default_templates.get(purpose, default_templates['정보제공'])
        random.shuffle(templates)
        for j, template in enumerate(templates):
            all_topics.append({
                'title': f'{base_keyword} {template}',
                'description': f'{base_keyword}에 대한 {template.lower()} 정보를 제공합니다',
                'keyword': base_keyword,
                'keyword_id': i,
                'topic_id': f'keyword_{i}_topic_{j}_{random.randint(1000,9999)}',
            })

    return JsonResponse({'success': True, 'topics': all_topics})

@require_POST
@csrf_protect
@api_view
def generate_content_from_topics(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    data = _json(request)
    selected_topics = data.get('selected_topics', [])
    content_options = data.get('content_options', {})

    if not selected_topics:
        return JsonResponse({'error': '선택된 주제가 없습니다.'}, status=400)

    all_generated = []
    for i, topic in enumerate(selected_topics):
        base_keyword = topic.get('keyword', topic.get('title', ''))
        title = topic.get('title', f'주제 {i+1}')
        content_sections = [
            {'type': 'paragraph', 'text': f'{base_keyword}에 대한 상세한 정보를 제공합니다.'},
            {'type': 'h2', 'text': f'{base_keyword}의 주요 특징'},
            {'type': 'paragraph', 'text': f'{base_keyword}의 핵심 기능과 장점'},
        ]
        content = {
            'title': title,
            'h1': f'{base_keyword} 완벽 가이드',
            'content': content_sections,
            'meta_description': f'{base_keyword}에 대한 완벽한 가이드',
            'keywords': [base_keyword],
        }
        all_generated.append({
            'topic_id': topic.get('topic_id', f'topic_{i}'),
            'topic_title': title,
            'topic_description': topic.get('description', ''),
            'keyword': base_keyword,
            'generated_at': time.time(),
            'content': content,
        })

    return JsonResponse({'success': True, 'generated_content': all_generated, 'total_generated': len(all_generated)})

@require_POST
@csrf_protect
@api_view
def generate_content(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    data = _json(request)
    keyword_data = data.get('keyword_data', {})
    selected_topics = data.get('selected_topics', [])
    naver_account = data.get('naver_account', {})

    if not keyword_data or not keyword_data.get('base_keyword'):
        return JsonResponse({'error': '키워드 정보가 필요합니다.'}, status=400)
    if not selected_topics:
        return JsonResponse({'error': '선택된 주제가 필요합니다.'}, status=400)
    if not naver_account.get('id') or not naver_account.get('password'):
        return JsonResponse({'error': '네이버 계정 정보가 필요합니다.'}, status=400)

    # Minimal demo: fabricate results and return
    results = []
    for topic in selected_topics:
        base_keyword = topic.get('keyword', '')
        content_text_items = [
            {'type': 'paragraph', 'text': f'{base_keyword}는 현대 비즈니스에서 필수적인 요소입니다.'},
            {'type': 'h2', 'text': f'{base_keyword} 장점'},
            {'type': 'paragraph', 'text': '효율성과 정확성을 크게 향상시킬 수 있습니다.'},
        ]
        content = {
            'title': topic.get('title', base_keyword),
            'h1': f'{base_keyword}의 모든 것',
            'content': content_text_items,
        }
        results.append({'success': True, 'content': content})

    return JsonResponse({'success': True, 'results': results})

@csrf_exempt
def get_user_data(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    # Return empty data for now - content generation features can be enhanced later
    return JsonResponse({'success': True, 'data': {}})

@csrf_exempt
def get_generated_content(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    # Return empty content for now
    return JsonResponse({
        'success': True, 
        'generated_content': [], 
        'total_count': 0,
        'user_id': user_id
    })

@require_POST
@csrf_protect
@api_view
def delete_generated_content(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    return JsonResponse({'success': True, 'message': '콘텐츠가 삭제되었습니다.', 'deleted_content': 'Demo'})

# Background jobs are now handled by Celery tasks

@ratelimit(key='user', rate='3/h', method='POST', block=True)
@require_POST
@csrf_protect
@api_view
def start_job(request):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    body = _json(request)
    naver_id = body.get('naver_id')
    naver_pw = body.get('naver_pw')
    
    # Log request without sensitive data
    log.info(f'Job start requested by user {user_id}', extra={
        'user_id': user_id,
        'request_data': _sanitize_for_logging(body)
    })
    
    if not naver_id or not naver_pw:
        return JsonResponse({'error': '네이버 아이디와 비밀번호를 입력해주세요.'}, status=400)
    
    # SECURITY: Never store or log credentials
    # Start Celery task with credentials
    task = run_blog_automation.delay(user_id, naver_id, naver_pw)
    
    # Clear credentials from memory
    del naver_id, naver_pw
    
    log.info(f'Celery task started: {task.id} for user {user_id}')
    
    return JsonResponse({
        'success': True, 
        'job_id': task.id,
        'message': '작업이 시작되었습니다. 상태를 확인하려면 job_id를 사용하세요.'
    })

def job_status(request, job_id: str):
    user_id = _ensure_user_session(request)
    if not user_id:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)
    
    # Get Celery task result
    from celery.result import AsyncResult
    
    try:
        task = AsyncResult(job_id)
        
        if task.state == 'PENDING':
            response = {
                'status': 'pending',
                'progress': 0,
                'message': '작업 대기 중...'
            }
        elif task.state == 'PROGRESS':
            response = {
                'status': 'running',
                'progress': task.info.get('progress', 0),
                'message': task.info.get('message', '작업 진행 중...'),
                'current': task.info.get('current', 0),
                'total': task.info.get('total', 1)
            }
        elif task.state == 'SUCCESS':
            response = {
                'status': 'completed',
                'progress': 100,
                'message': task.info.get('message', '작업 완료!'),
                'results': task.info.get('results', [])
            }
        else:  # FAILURE
            response = {
                'status': 'error',
                'progress': 0,
                'message': str(task.info.get('message', '작업 실패')),
                'error': str(task.info.get('error', '알 수 없는 오류'))
            }
        
        return JsonResponse({
            'job_id': job_id,
            'task_state': task.state,
            **response
        })
        
    except Exception as e:
        log.error(f'Error getting job status for {job_id}: {e}')
        return JsonResponse({
            'status': 'error',
            'message': '작업 상태를 가져올 수 없습니다.'
        }, status=500)
