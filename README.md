# Google OAuth 로그인 프로젝트

Next.js와 Google OAuth 2.0을 사용한 로그인 시스템입니다.

## 🚀 기능

- ✅ Google OAuth 2.0 연동
- ✅ 사용자 정보 표시 (이름, 이메일, 프로필 사진)
- ✅ 로그인 상태 유지 (localStorage)
- ✅ 로그아웃 기능
- ✅ 반응형 UI (Tailwind CSS)
- ✅ TypeScript 지원

## 📦 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## ⚙️ 환경 설정

1. **Google Cloud Console**에서 OAuth 2.0 클라이언트 ID 생성
2. `.env.local` 파일에 클라이언트 ID 추가:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## 🔧 사용된 기술

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **OAuth**: @react-oauth/google
- **HTTP Client**: Axios
- **JWT**: jwt-decode

## 📁 프로젝트 구조

```
├── app/
│   ├── api/auth/google/route.ts  # Google OAuth API
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── GoogleLoginButton.tsx     # Google 로그인 버튼
│   └── UserProfile.tsx           # 사용자 프로필
├── lib/
│   └── auth.ts                   # 인증 유틸리티
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 주요 기능

### 1. Google OAuth 로그인
- Google 계정으로 간편 로그인
- JWT 토큰 자동 디코딩
- 사용자 정보 자동 추출

### 2. 사용자 정보 표시
- 프로필 사진
- 이름 및 이메일
- Google ID

### 3. 로그인 상태 관리
- localStorage를 통한 상태 유지
- 페이지 새로고침 시에도 로그인 상태 유지
- 로그아웃 시 상태 초기화

### 4. 서버 API 연동
- `/api/auth/google` 엔드포인트
- 클라이언트에서 서버로 사용자 정보 전송
- 서버 사이드 로직 처리 가능

## 🔍 개발 가이드

### Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth 2.0 Client IDs**
5. **Application type**: Web application
6. **Authorized JavaScript origins**: `http://localhost:3000`
7. **Authorized redirect URIs**: `http://localhost:3000`

### 환경변수 설정

```bash
# .env.local 파일 생성
cp env.local .env.local

# Google Client ID 입력
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_actual_client_id
```

## 🚀 배포

### Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 환경변수 설정 (배포 시)

- Vercel 대시보드에서 환경변수 설정
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 추가
- Google Cloud Console에서 배포 도메인 추가

## 📝 라이센스

MIT License 