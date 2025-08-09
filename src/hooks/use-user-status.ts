import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useUserStatus = (
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof usersApi.getUserStatus>>,
      Error,
      Awaited<ReturnType<typeof usersApi.getUserStatus>>,
      (typeof usersQueryKeys)['users/me']['status']['queryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: usersQueryKeys['users/me']['status'].queryKey,
    queryFn: usersApi.getUserStatus,
    retry: false,
    ...options,
  })
}
