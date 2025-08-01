import { Post } from '@/store/api-server-mocking-store'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const postsApi = {
  getPosts: async () => {
    const response = await fetch('/api/user/info')
    const data = (await response.json()) as Post[]
    return data
  },
  getPost: async (postId: number | undefined) => {
    const response = await fetch(`/api/user/info/${postId}`)
    const data = (await response.json()) as Post
    return data
  },
}

const postsKey = createQueryKeys('posts', {
  list: () => ['list'] as const,
  detail: (postId: number | undefined) => ['detail', postId] as const,
})

export const postsQueryKeys = postsKey
