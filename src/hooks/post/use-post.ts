import { postsQueryKeys, postsApi } from '@/api/posts'
import { useQuery } from '@tanstack/react-query'

export const usePost = (id: string | undefined) => {
  return useQuery({
    queryKey: postsQueryKeys.detail(id).queryKey,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => postsApi.getPost(id!),
    enabled: !!id,
  })
}
