import { FilterType } from '@/components/my-page-screen/point-history-container'
import { User } from '@/store/userStore'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

// 로그인/회원가입 feature issue merge 되고, api 연결하면 사용할 코드 (Written 정준영, 07.26)
// const apiUrl = import.meta.env['VITE_API_URL']

export const usersApi = {
  getUserStatus: async () => {
    const response = await fetch('/api/v1/users/me/status') // api 연결 후 -> `${import.meta.env.VITE_API_URL}/api/user/mypage`로 대체
    return response.json() as Promise<GetMyInfoResponse>
  },
  getUserPoints: async () => {
    const response = await fetch('/api/v1/users/me/points')
    return response.json() as Promise<GetMyPointsResponse>
  },
  getUserPointHistory: async (status: FilterType = 'all') => {
    const query = status && status !== 'all' ? `?status=${status}` : ''
    const response = await fetch(`/api/v1/users/me/points-history${query}`)
    return response.json() as Promise<GetMyPointsHistoryResponse>
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

export interface GetMyPointsResponse {
  success: boolean
  message: string
  result: {
    currentBalance: number
    totalEarned: number
    totalSpent: number
  }
}

export interface GetMyPointsHistoryResponse {
  success: boolean
  message: string
  result: {
    hasNext: boolean
    nextCursor: number
    content: [
      {
        pointTransactionId: string
        description: string
        amount: number
        status: 'EARN' | 'SPEND'
        transactionAt: string
      },
    ]
  }
}

const usersKey = createQueryKeys('users')

const userMeStatusKey = createQueryKeys('me/status', {
  detail: (userId?: string) => [userId] as const,
})

const userPointsKey = createQueryKeys('me/points', {
  detail: (userId?: string) => [userId] as const,
})

const userPointHistoryKey = createQueryKeys('me/point-history', {
  detail: (userId?: string, status?: FilterType) => [userId, status] as const,
})

export const usersQueryKeys = mergeQueryKeys(
  usersKey,
  userMeStatusKey,
  userPointsKey,
  userPointHistoryKey,
)
