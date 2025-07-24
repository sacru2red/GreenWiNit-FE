import FilteredChallengesDisplay from '@/components/filtered-challenges-display'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function CertifiedChallenges() {
  return (
    <MyPageLayout title="인증 챌린지" navigationIsExist={true}>
      <FilteredChallengesDisplay />
    </MyPageLayout>
  )
}

export default CertifiedChallenges
