import AppTitle from '@/components/common/app-title'
import BottomNavigation from '@/components/common/bottom-navigation'
import UserCard from '@/components/common/user-card'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Challenges from '@/components/home-screen/challenges'
import { Button } from '@/components/common/button'
import WarnNotLoggedIn from '@/components/home-screen/warn-not-logged-in'
import { authStore } from '@/store/auth-store'
import PageLayOut from '@/components/common/page-layout'

type HomeSearch =
  | undefined
  | {
      accessToken?: string | undefined
      refreshToken?: string | undefined
    }

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const refreshToken =
      typeof search['refreshToken'] === 'string' ? search['refreshToken'] : undefined

    const accessToken =
      typeof search['accessToken'] === 'string' ? search['accessToken'] : undefined

    return { accessToken, refreshToken }
  },
})

function Home() {
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)
  const search = Route.useSearch()
  const setAccessToken = authStore((state) => state.setAccessToken)

  const handleClickJoinedChallengeButton = () => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }

    navigate({ to: '/challenges/user/me/joined' })
  }

  useEffect(() => {
    // URL에서 accessToken 쿼리 파라미터 확인
    const accessToken = search?.accessToken
    const refreshToken = search?.refreshToken

    if (accessToken) {
      setAccessToken(accessToken)
      // 쿼리 파라미터 제거
      navigate({ to: '/' })
    }
    if (refreshToken) {
      document.cookie = `TokenManager=${refreshToken}; path=/;`
    }
  }, [setAccessToken, navigate, search?.accessToken, search?.refreshToken])

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
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
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Home
