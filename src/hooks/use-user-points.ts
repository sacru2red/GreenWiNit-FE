import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import useIsLoggedIn from './use-is-logged-in'

export const useUserPoints = () => {
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    queryKey: usersQueryKeys['points']['detail'].queryKey,
    queryFn: usersApi.getUserPoints,
    enabled: isLoggedIn,
  })
}
