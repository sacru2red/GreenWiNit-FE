import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { cn } from './lib/utils'
import SplashScreen from './components/splash-screen'
import JoinedChallenges from './routes/challenges/user/me/joined'
import ChallengeDetail from './routes/challenges/$id/detail'
import ChallengeSubmitIndividual from './routes/challenges/$id/submit/individual'
import ChallengesTeam from './routes/challenges/$id/teams'
import JoinTeam from './routes/challenges/$id/teams/join'
import TeamDetail from './routes/challenges/$id/teams/$team-id'
import TeamEnroll from './routes/challenges/$id/teams/enroll'
import ManageTeam from './routes/challenges/$id/teams/$team-id/joined'
import TeamModify from './routes/challenges/$id/teams/$team-id/modify'
import ChallengeSubmitTeam from './routes/challenges/$id/submit/team/$teamId'
import InternalServerError from './routes/500'
import Home from '@/routes'
import Login from '@/routes/login'
import MyPage from '@/pages/my-page'
import MyPoints from '@/pages/my-page/my-points'
import WithDraw from '@/pages/my-page/withdraw'
import EditProfile from '@/pages/my-page/edit-profile'
import CertifiedChallenges from '@/pages/my-page/certifed-challenges'
import CertifiedChallengeDetails from '@/pages/my-page/certified-challenge-details'
import NotFound from '@/routes/404'
import PointShop from './pages/point-shop'
import ProductDetail from './pages/point-shop/products/[pointProductId]/detail'
import PostDetail from './routes/posts/$id'
import EnrollAddress from './pages/point-shop/products/[pointProductId]/enroll-address'
import Signup from './routes/signup'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Posts from './routes/posts'
import Terms from '@/routes/terms'

const queryClient = new QueryClient()

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <ErrorBoundary fallback={<InternalServerError />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="bg-mountain_meadow-0 outline-mountain_meadow relative flex aspect-[375/812] h-full justify-self-center outline-1 max-[375px]:aspect-auto max-[375px]:w-full">
            {showSplashScreen ? (
              <div
                className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
              >
                <SplashScreen />
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/challenges/user/me/joined" element={<JoinedChallenges />} />
                <Route path="/challenges/:challengeId/detail" element={<ChallengeDetail />} />
                <Route
                  path="/challenges/:challengeId/submit/individual"
                  element={<ChallengeSubmitIndividual />}
                />
                <Route path="/challenges/:challengeId/teams" element={<ChallengesTeam />} />
                <Route path="/challenges/:challengeId/teams/join" element={<JoinTeam />} />
                <Route path="/challenges/:challengeId/teams/enroll" element={<TeamEnroll />} />
                <Route
                  path="/challenges/:challengeId/submit/teams/:teamId"
                  element={<ChallengeSubmitTeam />}
                />
                <Route
                  path="/challenges/:challengeId/teams/:teamId/joined"
                  element={<ManageTeam />}
                />
                <Route
                  path="/challenges/:challengeId/teams/:teamId/modify"
                  element={<TeamModify />}
                />
                <Route path="/challenges/:challengeId/teams/:teamId" element={<TeamDetail />} />
                <Route path="/my-page" element={<MyPage />} />
                <Route path="/my-page/my-points" element={<MyPoints />} />
                <Route path="/my-page/withdraw" element={<WithDraw />} />
                <Route path="/my-page/edit-profile" element={<EditProfile />} />
                <Route path="/my-page/challenges/certified" element={<CertifiedChallenges />} />
                <Route
                  path="/my-page/challenges/certify/:challengeId"
                  element={<CertifiedChallengeDetails />}
                />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
                <Route path="/point-shop" element={<PointShop />} />
                <Route path="/point-shop/product/:pointProductId" element={<ProductDetail />} />
                <Route
                  path="/point-shop/product/:pointProductId/enroll-address"
                  element={<EnrollAddress />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/500" element={<InternalServerError />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </div>
          <Toaster position="top-center" swipeDirections={['bottom', 'left', 'right', 'top']} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
