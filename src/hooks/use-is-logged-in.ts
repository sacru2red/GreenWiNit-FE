import { userStore } from '@/store/userStore'

const useIsLoggedIn = () => {
  const user = userStore((s) => s.user)
  return user != null
}

export default useIsLoggedIn
