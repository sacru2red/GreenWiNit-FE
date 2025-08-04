import { usersApi, usersQueryKeys } from '@/api/users'
import { PointFilterType } from '@/types/points'
import { useQuery } from '@tanstack/react-query'
import useUserId from './use-user-id'

export const useUserPointHistory = (type: PointFilterType | null) => {
  const userId = useUserId()

  return useQuery({
    queryKey: usersQueryKeys['me/point-history'].detail(userId, type).queryKey,
    queryFn: () => usersApi.getUserPointHistory(type),
  })
}
