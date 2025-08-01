import { postsQueryKeys, postsApi } from '@/api/posts'
import { useQuery } from '@tanstack/react-query'

export const useInformation = (id: number | undefined) => {
  return useQuery({
    queryKey: postsQueryKeys.detail(id).queryKey,
    queryFn: () => postsApi.getPost(id),
  })
}
