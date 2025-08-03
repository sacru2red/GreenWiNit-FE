import { API_URL } from '@/constant/network'
import { WithDrawnFormState } from '@/pages/my-page/withdraw'
import { User } from '@/store/user-store'
import { PointFilterType, PointHistory } from '@/types/points'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export const usersApi = {
  getUserStatus: async () => {
    const response = await fetch(`${API_URL}/user/mypage`)
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
  putUserProfile: async (
    nickname: string,
    profileImageUrl = 'https://www.greenwinit.store/img/logo-icon.png',
  ) => {
    return await fetch(`${API_URL}/members/profile`, {
      method: 'PUT',
      body: JSON.stringify({ nickname, profileImageUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as Promise<PutUserProfileResponse>)
  },
  checkNicknameDuplicate: async (nickname: string) => {
    return await fetch(`${API_URL}/members/nickname-check`, {
      method: 'POST',
      body: JSON.stringify({ nickname }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as Promise<CheckNicknameDuplicateReponse>)
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
  withdraw: async ({ reasonType, customReason }: WithDrawnFormState) => {
    return fetch(`${API_URL}/members/withdraw`, {
      method: 'POST',
      body: JSON.stringify({ reasonType, customReason }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as Promise<PostWithdrawResponse>)
  },
}

interface BaseApiResponse<T> {
  success: boolean
  message: string
  result?: T
}

type GetMyInfoResponse = BaseApiResponse<{
  userChallengeCount: number
  userTotalPoints: number
  userLevel: number
}>

type GetMyPointsResponse = BaseApiResponse<{
  currentBalance: number
  totalEarned: number
  totalSpent: number
}>

type GetMyPointsHistoryResponse = BaseApiResponse<{
  hasNext: boolean
  nextCursor: number
  content: PointHistory[]
}>

type PostWithdrawResponse = BaseApiResponse<undefined>

type PutUserProfileResponse = { nickname: string; profileImageUrl: string } | { message: string }

type CheckNicknameDuplicateReponse =
  | {
      nickname: string
      available: boolean
      message: string
    }
  | {
      error: string
      message: string
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
