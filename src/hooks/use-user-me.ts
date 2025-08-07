import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const useUserMe = (
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof usersApi.getUserMe>>,
      Error,
      Awaited<ReturnType<typeof usersApi.getUserMe>>,
      typeof usersQueryKeys.users.me.queryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: usersQueryKeys.users.me.queryKey,
    queryFn: usersApi.getUserMe,
  })
}

export default useUserMe
