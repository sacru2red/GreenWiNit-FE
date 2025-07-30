import { API_URL } from '@/constant/network'
import { User } from '@/store/userStore'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export const usersApi = {
  getUserStatus: async () => {
    // @TODO replace to `await fetch(`${API_URL}/user/mypage`)`
    const response = await fetch(`${API_URL}/users/me/status`)
    return response.json() as Promise<UserStatus>
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

export interface UserStatus {
  point: number
  challengeCount: number
  level: {
    name: string
    code: number
    exp: number
    nextLevelExp: number
  }
}

const usersKey = createQueryKeys('users')
const userMeStatusKey = createQueryKeys('me/status', {
  detail: (userId?: string) => [userId] as const,
})

export const usersQueryKeys = mergeQueryKeys(usersKey, userMeStatusKey)
