import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import useUserId from './use-user-id'
import { authStore } from '@/store/auth-store'

export const useUserStatus = () => {
  const accessToken = authStore.getState().accessToken
  const userId = useUserId()

  return useQuery({
    queryKey: usersQueryKeys['me/status'].detail(userId).queryKey,
    queryFn: usersApi.getUserStatus,
    enabled: accessToken != null,
  })
}
