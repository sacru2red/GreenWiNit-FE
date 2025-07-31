import { usersApi, usersQueryKeys } from '@/api/users'
import { userStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export const useUserPoints = () => {
  const user = userStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/points'].detail(user?.id).queryKey,
    queryFn: usersApi.getUserPoints,
  })
}
