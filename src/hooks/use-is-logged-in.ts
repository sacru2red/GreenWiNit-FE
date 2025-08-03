import { authStore } from '@/store/auth-store'

const useIsLoggedIn = () => {
  const accessToken = authStore((s) => s.accessToken)
  return accessToken != null
}

export default useIsLoggedIn
