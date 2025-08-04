import { usersApi, usersQueryKeys } from '@/api/users'
import useUserId from './use-user-id'
import { useQuery } from '@tanstack/react-query'

export const useUserPoints = () => {
  const userId = useUserId()

  return useQuery({
    queryKey: usersQueryKeys['me/points'].detail(userId).queryKey,
    queryFn: usersApi.getUserPoints,
  })
}
