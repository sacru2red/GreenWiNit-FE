import { User } from '@/store/userStore'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

// 로그인/회원가입 feature issue merge 되고, api 연결하면 사용할 코드 , writed 정준영 07.26
// const apiUrl = import.meta.env['VITE_API_URL']

export const usersApi = {
  getUserStatus: async () => {
    const response = await fetch('/api/v1/users/me/status') // api 연결 후 -> `${import.meta.env.VITE_API_URL}/api/user/mypage`로 대체
    return response.json() as Promise<GetMyInfoResponse>
  },
  login: async ({ oAuthToken }: { oAuthToken: string }) => {
    return await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ oAuthToken }),
    }).then((res) => res.json() as Promise<User>)
  },
  logout: async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
}

export interface GetMyInfoResponse {
  success: boolean
  message: string
  result: {
    userChallengeCount: number
    userTotalPoints: number
    userLevel: number
  }
}

const usersKey = createQueryKeys('users')
const userMeStatusKey = createQueryKeys('me/status', {
  detail: (userId?: string) => [userId] as const,
})

export const usersQueryKeys = mergeQueryKeys(usersKey, userMeStatusKey)
