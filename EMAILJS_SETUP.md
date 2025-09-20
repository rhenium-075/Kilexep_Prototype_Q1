# EmailJS 설정 가이드

데모 신청 폼이 EmailJS를 통해 이메일을 전송하도록 구현되었습니다.

## 🚀 EmailJS 설정 단계

### 1. EmailJS 계정 생성
1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속
2. 무료 계정 생성 (월 200개 이메일까지 무료)

### 2. 이메일 서비스 연결
1. Dashboard → Email Services
2. "Add New Service" 클릭
3. Gmail, Outlook 등 원하는 이메일 서비스 선택
4. 본인 이메일 계정 연결
5. **Service ID** 복사해두기

### 3. 이메일 템플릿 생성
1. Dashboard → Email Templates
2. "Create New Template" 클릭
3. 템플릿 내용 작성:

```
Subject: 새로운 데모 신청 - {{company}}

안녕하세요,

새로운 데모 신청이 접수되었습니다:

회사명: {{company}}
직책: {{position}}
이메일: {{email}}
전화번호: {{phone}}

메시지:
{{message}}

빠른 연락 부탁드립니다.

감사합니다.
```

4. **Template ID** 복사해두기

### 4. Public Key 확인
1. Dashboard → Account
2. **Public Key** 복사해두기

### 5. 코드에 ID 입력
`app/demo/page.tsx` 파일에서 다음 부분을 수정:

```javascript
// 33번째 줄 근처
emailjs.init("YOUR_PUBLIC_KEY_HERE") // ← 본인의 Public Key

// 86-87번째 줄 근처
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',     // ← 본인의 Service ID
  'YOUR_TEMPLATE_ID_HERE',    // ← 본인의 Template ID
  templateParams
)
```

## 📧 받을 이메일 형태

데모 신청이 오면 다음과 같은 이메일을 받게 됩니다:

**제목**: 새로운 데모 신청 - [회사명]

**내용**:
- 회사명: 입력된 회사명
- 직책: 입력된 직책
- 이메일: 신청자 이메일
- 전화번호: 신청자 전화번호

## 🔧 테스트 방법

1. 위 설정 완료 후 `npm run dev`로 서버 실행
2. `http://localhost:3001/demo` 접속
3. 폼 작성 후 제출
4. 연결된 이메일 계정에서 이메일 도착 확인

## 💡 추가 팁

- EmailJS 무료 플랜: 월 200개 이메일
- 더 많은 이메일이 필요하면 유료 플랜 고려
- 스팸 방지를 위해 reCAPTCHA 추가 가능
- 이메일 템플릿에서 HTML 형식도 사용 가능

## 🛠 문제 해결

- **이메일이 안 옴**: Service ID, Template ID, Public Key 재확인
- **403 에러**: Public Key 또는 도메인 설정 확인
- **400 에러**: 템플릿 변수명 확인 ({{company}}, {{email}} 등)

