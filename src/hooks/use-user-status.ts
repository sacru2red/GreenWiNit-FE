import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import useIsLoggedIn from './use-is-logged-in'

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
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    queryKey: usersQueryKeys['users/me']['status'].queryKey,
    queryFn: usersApi.getUserStatus,
    retry: false,
    enabled: isLoggedIn,
    ...options,
  })
}
