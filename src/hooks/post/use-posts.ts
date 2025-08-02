import { postsQueryKeys, postsApi } from '@/api/posts'
import { useQuery } from '@tanstack/react-query'

export const usePosts = () => {
  return useQuery({
    queryKey: postsQueryKeys.list().queryKey,
    queryFn: postsApi.getPosts,
  })
}
