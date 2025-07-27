import { usersApi, usersQueryKeys } from '@/api/users'
import { FilterType } from '@/components/my-page-screen/point-history-container'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export const useUserPointHistory = (type: FilterType = 'all') => {
  const user = useUserStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/point-history'].detail(user?.id, type).queryKey,
    queryFn: () => usersApi.getUserPointHistory(type),
  })
}
