import { InfoCard } from '@/pages/posts'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const postsApi = {
  getPosts: async () => {
    const response = await fetch('/api/user/info')
    const data = (await response.json()) as InfoCard[]
    return data
  },
  getPost: async (infoId: number | undefined) => {
    const response = await fetch(`/api/user/info/${infoId}`)
    const data = (await response.json()) as InfoCard
    return data
  },
}

const postsKey = createQueryKeys('posts', {
  list: () => ['list'] as const,
  detail: (id: number | undefined) => ['detail', id] as const,
})

export const postsQueryKeys = postsKey
