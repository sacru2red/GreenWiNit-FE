import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import useChallenge from '@/hooks/useChallenge'
import { useParams } from 'react-router-dom'

const ChallengesTeam = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data: challenge } = useChallenge(id)

  // challenge.

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>나의 팀</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle title={challenge?.name} />
      </div>
    </PageContainer>
  )
}

export default ChallengesTeam
