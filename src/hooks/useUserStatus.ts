import { usersApi, usersQueryKeys } from '@/api/users'
import { userStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'

export const useUserStatus = () => {
  const user = userStore((s) => s.user)

  return useQuery({
    queryKey: usersQueryKeys['me/status'].detail(user?.id).queryKey,
    queryFn: usersApi.getUserStatus,
  })
}
