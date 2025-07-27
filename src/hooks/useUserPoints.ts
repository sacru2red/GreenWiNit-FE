import { usersApi, usersQueryKeys } from '@/api/users'
import { useUserStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export const useUserPoints = () => {
  const user = useUserStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/points'].detail(user?.id).queryKey,
    queryFn: usersApi.getUserPoints,
  })
}
