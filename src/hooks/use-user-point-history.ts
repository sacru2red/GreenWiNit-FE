import { usersApi, usersQueryKeys } from '@/api/users'
import { PointFilterType } from '@/types/points'
import { useQuery } from '@tanstack/react-query'

export const useUserPointHistory = (type: PointFilterType | null) => {
  return useQuery({
    queryKey: usersQueryKeys['me/point-history'].detail(type).queryKey,
    queryFn: () => usersApi.getUserPointHistory(type),
  })
}
