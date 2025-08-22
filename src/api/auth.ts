import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ApiResponse } from '@/types/api'

export const authApi = {
  refreshAccessToken: async () => {
    return await fetch(`${API_URL}/auth/v2/refresh`, { method: 'POST' })
      .then(throwResponseStatusThenChaining)
      .then((res) => {
        return res.json() as Promise<
          ApiResponse<{ accessToken: string; memberKey: string; userName: null }>
        >
      })
  },
}
