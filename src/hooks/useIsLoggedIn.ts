import { useUserStore } from '@/store/userStore'

const useIsLoggedIn = () => {
  const user = useUserStore((s) => s.user)
  return user != null
}

export default useIsLoggedIn
