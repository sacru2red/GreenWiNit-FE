import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import useUserId from './use-user-id'

export const useUserStatus = () => {
  const userId = useUserId()

  return useQuery({
    queryKey: usersQueryKeys['me/status'].detail(userId).queryKey,
    queryFn: usersApi.getUserStatus,
    retry: false,
  })
}
