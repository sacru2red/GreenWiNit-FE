import CertifiedChallengesContainer from '@/components/my-page-screen/certified-challenges-container'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page/challenges/certified')({
  component: CertifiedChallenges,
})

function CertifiedChallenges() {
  return (
    <MyPageLayout title="인증 챌린지" showBottomNavigation>
      <CertifiedChallengesContainer />
    </MyPageLayout>
  )
}

export default CertifiedChallenges
