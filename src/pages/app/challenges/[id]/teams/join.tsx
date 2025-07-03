import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import TeamCard from '@/components/common/teams/TeamCard'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import useChallenge from '@/hooks/useChallenge'
import { useNavigate, useParams } from 'react-router-dom'

const JoinTeam = () => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId

  const { data: challenge } = useChallenge(challengeId)
  const navigate = useNavigate()

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 선택하기</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle title={challenge?.name} />
        <div className="flex flex-1 flex-col gap-4">
          {challenge?.type === 1 &&
            challenge.teams.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  navigate(`/challenges/${challengeId}/teams/${team.id}`)
                }}
              >
                <TeamCard team={team} />
              </button>
            ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default JoinTeam
