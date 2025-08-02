import { userStore } from '@/store/user-store'

const useIsLoggedIn = () => {
  const user = userStore((s) => s.user)
  return user != null
}

export default useIsLoggedIn
