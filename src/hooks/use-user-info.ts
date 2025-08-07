import { usersApi, usersQueryKeys } from '@/api/users'
import { useQuery } from '@tanstack/react-query'

const useUserInfo = () => {
  // @TODO replace this
  return useQuery({
    queryKey: usersQueryKeys['users/me'].member.queryKey,
    queryFn: usersApi.getUser,
  })
}

export default useUserInfo
