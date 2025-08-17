import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import JoinedChallengesContainer from '@/components/home-screen/challenges/joined-challenges-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/user/me/joined')({
  component: JoinedChallenges,
})

function JoinedChallenges() {
  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>참여 챌린지</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <JoinedChallengesContainer />
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default JoinedChallenges
