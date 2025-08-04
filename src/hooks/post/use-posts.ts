import { postsQueryKeys, postsApi } from '@/api/posts'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const usePosts = (
  params?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof postsApi.getPosts>>>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: postsQueryKeys.list().queryKey,
    queryFn: postsApi.getPosts,
    ...params,
  })
}

export const usePostsArrayOnly = () => {
  const queryResult = usePosts()

  return { ...queryResult, data: queryResult.data?.result?.content }
}
