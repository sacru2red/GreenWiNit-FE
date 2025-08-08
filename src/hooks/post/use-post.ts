import { postsQueryKeys, postsApi } from '@/api/posts'
import { useQuery } from '@tanstack/react-query'

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: postsQueryKeys.detail(id).queryKey,
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  })
}
