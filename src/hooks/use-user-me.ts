import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import useIsLoggedIn from './use-is-logged-in'

const useUserMe = (
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof usersApi.getUserMe>>,
      Error,
      Awaited<ReturnType<typeof usersApi.getUserMe>>,
      (typeof usersQueryKeys)['users/me']['member']['queryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    queryKey: usersQueryKeys['users/me']['member'].queryKey,
    queryFn: usersApi.getUserMe,
    enabled: isLoggedIn,
    ...options,
  })
}

export default useUserMe
