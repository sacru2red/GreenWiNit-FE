import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import useUserId from './use-user-id'

export const useUserStatus = (
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof usersApi.getUserStatus>>,
      Error,
      Awaited<ReturnType<typeof usersApi.getUserStatus>>,
      ReturnType<(typeof usersQueryKeys)['me/status']['detail']>['queryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const userId = useUserId()

  return useQuery({
    queryKey: usersQueryKeys['me/status'].detail(userId).queryKey,
    queryFn: usersApi.getUserStatus,
    retry: false,
    ...options,
  })
}
