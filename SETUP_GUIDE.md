# Kilexep Prototype - 환경 설정 가이드

## 📋 필수 요구사항

### **1. Node.js 설치**
- Node.js 18.0.0 이상
- https://nodejs.org/ 에서 다운로드

### **2. Python 설치**
- Python 3.8 이상
- https://python.org/ 에서 다운로드

### **3. Cursor AI 설치**
- https://cursor.sh/ 에서 다운로드

## 🚀 프로젝트 설정 단계

### **1. 프로젝트 폴더 열기**
```bash
# Cursor AI에서 프로젝트 폴더 열기
# File > Open Folder > Kilexep_Backup 선택
```

### **2. Node.js 의존성 설치**
```bash
npm install
```

### **3. Python 의존성 설치**
```bash
pip install -r requirements.txt
```

### **4. 환경 변수 설정**
`.env.local` 파일 생성:
```env
FLASK_BASE_URL=http://localhost:80
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

### **5. 서버 실행**

#### **Flask 백엔드 (포트 80):**
```bash
python app.py
```

#### **Next.js 프론트엔드 (포트 3000):**
```bash
npm run dev
```

## 🔧 문제 해결

### **포트 충돌 시:**
- Flask: `app.py`에서 포트 변경
- Next.js: `package.json`의 dev 스크립트에서 포트 변경

### **권한 문제 시:**
- 관리자 권한으로 터미널 실행
- 방화벽 설정 확인

### **의존성 설치 실패 시:**
```bash
# Node.js 캐시 클리어
npm cache clean --force

# Python 캐시 클리어
pip cache purge
```

## 📁 프로젝트 구조

```
Kilexep_Backup/
├── app/                    # Next.js 앱
│   ├── api/               # API 라우트
│   ├── components/        # React 컴포넌트
│   ├── onboarding/        # 온보딩 페이지
│   ├── trend-analyzer/    # 트렌드 분석 페이지
│   ├── content-generator/ # 콘텐츠 생성 페이지
│   └── blog-auto/         # 블로그 자동화 페이지
├── app.py                 # Flask 백엔드
├── requirements.txt       # Python 의존성
├── package.json          # Node.js 의존성
└── README.md             # 프로젝트 설명
```

## 🌐 접속 URL

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:80

## 🔐 API 키 설정

### **Gemini API 키:**
1. https://makersuite.google.com/app/apikey 에서 생성
2. `.env.local`에 `GEMINI_API_KEY` 추가

### **Google OAuth:**
1. Google Cloud Console에서 OAuth 2.0 클라이언트 생성
2. `.env.local`에 클라이언트 ID/Secret 추가

## 📝 개발 팁

### **Cursor AI 단축키:**
- `Ctrl + K`: AI 명령어 입력
- `Ctrl + L`: 코드 설명 요청
- `Ctrl + I`: 인라인 AI 도움말

### **디버깅:**
- Flask: `app.py`에서 `debug=True` 설정
- Next.js: 브라우저 개발자 도구 사용

## 🚨 주의사항

1. **포트 충돌**: 80번 포트는 관리자 권한 필요
2. **API 키 보안**: `.env.local` 파일을 Git에 커밋하지 마세요
3. **브라우저 자동화**: Chrome 드라이버가 필요할 수 있음

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 모든 의존성이 올바르게 설치되었는지
2. 환경 변수가 올바르게 설정되었는지
3. 포트가 사용 가능한지
4. 방화벽 설정을 확인하세요 