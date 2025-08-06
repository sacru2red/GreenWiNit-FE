import { API_URL } from '@/constant/network'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export interface PostElement {
  id: string
  infoCategoryName: string
  title: string
  content: string
  imageurl: string
}

export const postsApi = {
  getPosts: async () => {
    try {
      const response = await fetch(`${API_URL}/user/info`)

      if (!response.ok) {
        throw new Error(`API ERROR: ${response.status} ${response.statusText}`)
      }

      return response.json() as Promise<
        | {
            success: false
            message: string
            result: null
          }
        | {
            success: true
            message: string
            result: {
              content: PostElement[]
            }
          }
      >
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.')
    }
  },
  getPost: async (postId: number | undefined) => {
    try {
      const response = await fetch(`${API_URL}/user/info/${postId}`)

      if (!response.ok) {
        throw new Error(`API ERROR: ${response.status} ${response.statusText}`)
      }

      return response.json() as Promise<
        | {
            success: false
            message: string
            result: null
          }
        | {
            success: true
            message: string
            result: PostElement
          }
      >
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '예상치 못한 오류가 발생하였습니다.')
    }
  },
}

const postsKey = createQueryKeys('posts', {
  list: () => ['list'] as const,
  detail: (postId: string | undefined) => ['detail', postId] as const,
})

export const postsQueryKeys = postsKey
