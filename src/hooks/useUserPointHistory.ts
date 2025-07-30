import { usersApi, usersQueryKeys } from '@/api/users'
import { useUserStore } from '@/store/userStore'
import { PointFilterType } from '@/types/points'
import { useQuery } from '@tanstack/react-query'

export const useUserPointHistory = (type: PointFilterType = 'all') => {
  const user = useUserStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/point-history'].detail(user?.id, type).queryKey,
    queryFn: () => usersApi.getUserPointHistory(type),
  })
}
