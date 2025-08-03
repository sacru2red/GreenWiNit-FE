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
    const response = await fetch(`${API_URL}/user/info`)
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
  },
  getPost: async (postId: number | undefined) => {
    const response = await fetch(`${API_URL}/user/info/${postId}`)
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
  },
}

const postsKey = createQueryKeys('posts', {
  list: () => ['list'] as const,
  detail: (postId: number | undefined) => ['detail', postId] as const,
})

export const postsQueryKeys = postsKey
