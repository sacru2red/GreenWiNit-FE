import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery } from '@tanstack/react-query'

export const useUserPoints = () => {
  return useQuery({
    queryKey: usersQueryKeys['points']['detail'].queryKey,
    queryFn: usersApi.getUserPoints,
  })
}
