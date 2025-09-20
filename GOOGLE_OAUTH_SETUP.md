# Google OAuth 설정 가이드

## 🔍 **Redirect URI 400 오류 해결 가이드**

### **문제 상황**
클라우드 환경에서 Google OAuth 로그인 시 400 오류가 발생하는 경우

### **원인 분석**
1. **Google Cloud Console**에 등록된 redirect URI와 실제 요청에서 사용하는 redirect URI가 일치하지 않음
2. 로컬 개발환경과 클라우드 배포환경 간의 도메인 차이

### **해결 방법**

#### **1. Google Cloud Console 설정**

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **APIs & Services** → **Credentials** 이동
3. 기존 OAuth 2.0 Client ID 선택 또는 새로 생성
4. **Authorized redirect URIs**에 다음 URL들을 모두 추가:

```
# 로컬 개발환경
http://localhost:3000/login
http://localhost:3001/login
http://127.0.0.1:3000/login

# 클라우드 배포환경 (실제 도메인으로 변경)
https://your-domain.com/login
https://your-app.vercel.app/login
https://your-app.herokuapp.com/login
https://your-app.netlify.app/login
```

#### **2. 환경변수 설정**

```bash
# .env 파일
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# 프로덕션 환경에서는 실제 도메인 설정
DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

#### **3. 코드 수정사항 (이미 적용됨)**

백엔드에서 환경에 따른 redirect URI 동적 처리:

```python
# backend/core/views.py
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
```

### **4. 디버깅 방법**

#### **로그 확인**
```bash
# Django 로그에서 실제 사용된 redirect URI 확인
tail -f backend/logs/django.log | grep "redirect_uri"
```

#### **브라우저 개발자 도구**
1. Network 탭에서 `/api/auth/google` 요청 확인
2. 응답에서 오류 메시지 확인
3. Console에서 JavaScript 오류 확인

### **5. 일반적인 오류 케이스**

| 오류 메시지 | 원인 | 해결방법 |
|------------|------|----------|
| `redirect_uri_mismatch` | Google Console과 코드의 URI 불일치 | Google Console에 정확한 URI 추가 |
| `invalid_request` | 잘못된 요청 형식 | 클라이언트 ID/Secret 확인 |
| `unauthorized_client` | 클라이언트 인증 실패 | OAuth 설정 재확인 |

### **6. 체크리스트**

- [ ] Google Cloud Console에 모든 환경의 redirect URI 등록
- [ ] 환경변수 올바르게 설정
- [ ] CORS 설정에 도메인 추가 (`settings.py`)
- [ ] HTTPS 사용 (프로덕션 환경)
- [ ] 클라이언트 ID와 Secret 일치 확인

### **7. 테스트 방법**

```bash
# 로컬에서 테스트
curl -X POST http://localhost:8000/api/auth/google \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"credential": "test_token"}'

# 프로덕션에서 테스트  
curl -X POST https://your-domain.com/api/auth/google \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-domain.com" \
  -d '{"credential": "test_token"}'
```

### **8. 추가 보안 설정**

#### **프로덕션 환경**
- HTTPS 강제 사용
- 도메인 검증 강화
- Rate limiting 적용

#### **개발 환경**
- localhost만 허용
- 디버그 로깅 활성화

---

## 📞 **문제 해결이 안 될 때**

1. 로그 파일 확인: `backend/logs/django.log`
2. Google OAuth Playground에서 토큰 테스트
3. 네트워크 요청/응답 상세 확인
4. 환경변수 재확인 및 서버 재시작

이 가이드를 따라하시면 클라우드 환경에서의 redirect URI 400 오류를 해결할 수 있습니다.
