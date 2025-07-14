import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/app/Login'
import Main from './pages/app/Main'
import MyPage from './pages/app/mypage/MyPage'
import { Fragment, useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import { cn } from './lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import JoinedChallenges from './pages/app/challenges/user/me/joined'
import ChallengeDetail from './pages/app/challenges/[id]/detail'
import ChallengeSubmitIndividual from './pages/app/challenges/[id]/submit/individual'
import ChallengesTeam from './pages/app/challenges/[id]/teams'
import JoinTeam from './pages/app/challenges/[id]/teams/join'
import TeamDetail from './pages/app/challenges/[id]/teams/[id]'
import TeamEnroll from './pages/app/challenges/[id]/teams/enroll'
import ManageTeam from './pages/app/challenges/[id]/teams/[id]/joined'
import TeamModify from './pages/app/challenges/[id]/teams/[id]/modify'
import ChallengeSubmitTeam from './pages/app/challenges/[id]/submit/team/[teamId]'
import { Toaster } from './components/ui/sonner'
import MyPoints from '@/pages/app/mypage/MyPoints'
import WithDraw from '@/pages/app/mypage/WithDraw'
import EditProfile from '@/pages/app/mypage/EditProfile'
import MyChallenges from '@/pages/app/mypage/MyChallenges'
import ChallengeCertify from '@/pages/app/mypage/ChallengeCertify'
import FAQ from '@/pages/app/Faq'

const queryClient = new QueryClient()

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <div className="bg-mountain_meadow-0 outline-mountain_meadow relative aspect-[375/812] h-full justify-self-center outline-1">
          <div
            className={`flex h-full flex-1 opacity-100 transition-all duration-500 ${cn(showSplashScreen ? 'overflow-hidden' : null)}`}
          >
            {showSplashScreen ? (
              <SplashScreen />
            ) : (
              <Routes>
                <Route path="/challenges/user/me/joined" element={<JoinedChallenges />} />
                <Route path="/challenges/:challengeId/detail" element={<ChallengeDetail />} />
                <Route
                  path="/challenges/:challengeId/submit/individual"
                  element={<ChallengeSubmitIndividual />}
                />
                <Route
                  path="/challenges/:challengeId/submit/teams/:teamId"
                  element={<ChallengeSubmitTeam />}
                />
                <Route path="/challenges/:challengeId/teams/join" element={<JoinTeam />} />
                <Route path="/challenges/:challengeId/teams" element={<ChallengesTeam />} />
                <Route path="/challenges/:challengeId/teams/enroll" element={<TeamEnroll />} />
                <Route
                  path="/challenges/:challengeId/teams/:teamId/joined"
                  element={<ManageTeam />}
                />
                <Route
                  path="/challenges/:challengeId/teams/:teamId/modify"
                  element={<TeamModify />}
                />
                <Route path="/challenges/:challengeId/teams/:teamId" element={<TeamDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/my-points" element={<MyPoints />} />
                <Route path="/mypage/withdraw" element={<WithDraw />} />
                <Route path="/mypage/edit-profile" element={<EditProfile />} />
                <Route path="/mypage/my-challenges" element={<MyChallenges />} />
                <Route path="/mypage/my-challenges/certify" element={<ChallengeCertify />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<Main />} />
              </Routes>
            )}
          </div>
        </div>
        {/* <Snackbar
            open={opened}
            autoHideDuration={3000}
            onClose={handleClick}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          /> */}
        <Toaster position="top-center" swipeDirections={['bottom', 'left', 'right', 'top']} />
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
