import { userStore } from '@/store/user-store'

const useIsLoggedIn = () => {
  const accessToken = userStore((s) => s.accessToken)
  return accessToken != null
}

export default useIsLoggedIn
