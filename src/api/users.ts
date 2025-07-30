import { API_URL } from '@/constant/network'
import { User } from '@/store/userStore'
import { PointFilterType, PointHistory } from '@/types/points'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export const usersApi = {
  getUserStatus: async () => {
    // @TODO replace to `await fetch(`${API_URL}/user/mypage`)`
    const response = await fetch(`${API_URL}/users/me/status`)
    return response.json() as Promise<GetMyInfoResponse>
  },
  getUserPoints: async () => {
    const response = await fetch('/api/v1/users/me/points')
    return response.json() as Promise<GetMyPointsResponse>
  },
  getUserPointHistory: async (status: PointFilterType = 'all') => {
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
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
  signup: async ({
    tempToken,
    nickname,
    profileImageUrl,
  }: {
    tempToken: string
    nickname: string
    profileImageUrl: string
  }) => {
    return fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ tempToken, nickname, profileImageUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  withdraw: async () => {
    return fetch(`${API_URL}/auth/withdraw`, {
      method: 'POST',
    })
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
    content: PointHistory[]
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
  detail: (userId?: string, status?: PointFilterType) => [userId, status] as const,
})

export const usersQueryKeys = mergeQueryKeys(
  usersKey,
  userMeStatusKey,
  userPointsKey,
  userPointHistoryKey,
)
