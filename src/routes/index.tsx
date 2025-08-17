import AppTitle from '@/components/common/app-title'
import BottomNavigation from '@/components/common/bottom-navigation'
import UserCard from '@/components/common/user-card'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Challenges from '@/components/home-screen/challenges'
import { Button } from '@/components/ui/button'
import WarnNotLoggedIn from '@/components/home-screen/warn-not-logged-in'
import { authStore } from '@/store/auth-store'
import PageLayOut from '@/components/common/page-layout'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)
  const setAccessToken = authStore((state) => state.setAccessToken)

  const handleClickJoinedChallengeButton = () => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }

    // @TODO toggle it
    // navigate({ to: '/challenges/user/me/joined' })
  }

  useEffect(() => {
    // URL에서 accessToken 쿼리 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('accessToken')

    if (accessToken) {
      setAccessToken(accessToken)
      // 쿼리 파라미터 제거
      navigate({ to: '/', search: {} })
    }
  }, [setAccessToken, navigate])

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <AppTitle className="!text-3xl" />
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection padding="zero">
        <div className="flex flex-col gap-4 p-4">
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
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Home
