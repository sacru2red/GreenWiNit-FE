import { usersApi } from '@/api/users'
import HeaderSectionMiddle from '@/components/common/header-section-middle'
import GoogleWideButton from '@/components/login-screen/google-wide-button'
import KakaoWideButton from '@/components/login-screen/kakao-wide-button'
import NaverWideButton from '@/components/login-screen/naver-wide-button'
import { userStore } from '@/store/userStore'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const login = userStore((state) => state.login)
  const logout = userStore((state) => state.logout)
  const [params] = useSearchParams()
  const redirectTo = params.get('redirect')

  const processLoginMocked = (oAuthToken: string) => {
    usersApi
      .login({ oAuthToken })
      .then((res) => {
        return login(res)
      })
      .catch((err) => {
        console.error('Login failed', err)
        logout()
        throw err
      })
      .then(() => {
        return navigate(redirectTo ?? '/')
      })
  }

  const processGoogleLogin = () => {
    // API_URL이나 API_SERVER_BASE_PATH 사용하면 안됨
    // 프록시를 통하면 리다이렉션 후 /login?error=auth_failed로 이동됨 (2025-07-30)
    const moveToBase =
      import.meta.env.VITE_OAUTH_BASE_URL ??
      (import.meta.env.MODE === 'staging'
        ? 'https://staging-api.greenwinit.store'
        : import.meta.env.MODE === 'production'
          ? 'https://api.greenwinit.store'
          : 'https://api.greenwinit.store')
    const moveTo = `${moveToBase}/oauth2/authorization/google`
    window.location.replace(moveTo)
  }

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-start gap-12">
      <HeaderSectionMiddle />
      <div className="absolute bottom-[10vh] flex w-full flex-col items-center justify-center gap-4 p-12">
        <KakaoWideButton onClick={() => processLoginMocked('ok-this-is-valid-oAuth-token')} />
        <GoogleWideButton onClick={processGoogleLogin} />
        <NaverWideButton onClick={() => processLoginMocked('ok-this-is-valid-oAuth-token')} />
        <p className="text-light-gray mt-4 text-center text-sm">
          간편하게 로그인하고
          <br />
          환경 챌린지에 참여하세요!
        </p>
      </div>
    </div>
  )
}

export default Login
