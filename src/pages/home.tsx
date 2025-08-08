import AppTitle from '@/components/common/app-title'
import BottomNavigation from '@/components/common/bottom-navigation'
import UserCard from '@/components/common/user-card'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Challenges from '@/components/home-screen/challenges'
import PageContainer from '@/components/common/page-container'
import { Button } from '@/components/ui/button'
import WarnNotLoggedIn from '@/components/home-screen/warn-not-logged-in'
import PageHeaderSection from '@/components/common/page-header-section'
import { authStore } from '@/store/auth-store'

function Home() {
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  const setAccessToken = authStore((state) => state.setAccessToken)

  const handleClickJoinedChallengeButton = () => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }

    navigate('/challenges/user/me/joined')
  }

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken)
      setSearchParams({})
    }
  }, [accessToken, setAccessToken, setSearchParams])

  return (
    <PageContainer>
      <PageHeaderSection>
        <AppTitle className="!text-3xl" />
      </PageHeaderSection>
      <div className="mt-5 flex flex-col p-4">
        <UserCard />
        <Button size="flex" onClick={handleClickJoinedChallengeButton} className="mt-6">
          참여 챌린지
        </Button>
        <WarnNotLoggedIn
          isOpen={isWarnNotLoggedInDialogOpen}
          onOpenChange={setIsWarnNotLoggedInDialogOpen}
        />
      </div>
      <Challenges />
      <BottomNavigation />
    </PageContainer>
  )
}

export default Home
