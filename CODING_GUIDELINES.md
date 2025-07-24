# 코드 작성 규칙 및 디렉토리 구조 컨벤션

본 문서는 프로젝트의 일관성 있는 코드 작성과 효율적인 협업을 위해 정한 규칙 및 디렉토리 구조 컨벤션을 정리한 것입니다. 팀원 모두가 참고하여 개발해 주세요.

---

## 1. 파일 이름

- **케밥 케이스 kebab-case**를 사용합니다.
  - 예시: `my-component.tsx`, `user-profile.ts`, `team-list.tsx`
  - **적용 범위:**
    - 디렉토리명, 모든 파일명(리액트 컴포넌트 파일 포함), 이미지/정적 리소스 파일명 등
  - **예외:**
    - 파일이름이 아닌 경우
      - 컴포넌트 파일 내부에서 내보내는 컴포넌트명(함수/변수)은 **파스칼 케이스**로 작성합니다.
        - 예시: `my-page.tsx` 파일 내 `export default function MyPage() { ... }`
        - 예시: `user-card.tsx` 파일 내 `const UserCard = () => { ... }; export default UserCard`

## 2. 타입 정의 위치

- 단일 파일 내부에서만 사용하는 타입은 해당 컴포넌트 파일 내에서 정의합니다.
- **여러 곳에서 재사용되는 타입**은 `types/` 폴더(필요시 생성) 또는 관련 폴더(`components/teams/UpsertPageBody/types.ts` 등)로 분리하여 import합니다.
  - 컴포넌트를 내보내는 파일에서는 타입이나 상수를 내보내서는 안됩니다. (ref: eslint `react-refresh/only-export-components` 룰)

## 3. 정해진 규칙 보관 위치

- 추가 논의 및 변경 사항은 GitHub Issue/PR 또는 Discord에서 논의 후 본 문서에 반영합니다.

---

## API 호출 컨벤션

- **fetch 호출은 `/src/api` 디렉토리 내에서만 허용됩니다.**
- 컴포넌트, 훅, 페이지 등에서는 직접 fetch를 호출하지 말고 API 모듈을 사용하세요.
- 새로운 API 엔드포인트가 필요한 경우 해당하는 API 파일에 함수를 추가하세요.

**예시:**

```typescript
// ❌ 잘못된 방법 - 컴포넌트에서 직접 fetch 호출
const handleSubmit = () => {
  fetch('/api/v1/challenges/submit', {
    method: 'POST',
    body: formData,
  })
}

// ✅ 올바른 방법 - API 모듈 사용
import { challengesApi } from '@/api/challenges'

const handleSubmit = () => {
  challengesApi.submitChallenge(formData)
}
```

**API 파일 구조:**

- `/src/api/challenges.ts` - 챌린지 관련 API
- `/src/api/users.ts` - 사용자 관련 API

- 현재 특별한 규칙은 없습니다. 의견이 있는 경우에 이슈를 제기해주세요.

> 본 문서는 팀원 간 합의에 따라 언제든 수정될 수 있습니다. 의견이 있으시면 Issue 또는 PR로 남겨주세요.
