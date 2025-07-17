import BottomNavigation from '@/components/common/BottomNav'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import FilteredChallengesDisplay from '@/components/FilteredChallengesDisplay'

const JoinedChallenges = () => {
  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>참여 챌린지</PageTitle>
      </PageHeaderSection>
      <FilteredChallengesDisplay />
      <BottomNavigation />
    </PageContainer>
  )
}

export default JoinedChallenges
