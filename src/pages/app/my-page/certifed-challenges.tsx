import MyPageLayout from '@/pages/app/my-page/my-page-layout'
import FilteredChallengesDisplay from '@/components/FilteredChallengesDisplay'

function CertifiedChallenges() {
  return (
    <MyPageLayout title="인증 챌린지" navigationIsExist={true}>
      <FilteredChallengesDisplay />
    </MyPageLayout>
  )
}

export default CertifiedChallenges
