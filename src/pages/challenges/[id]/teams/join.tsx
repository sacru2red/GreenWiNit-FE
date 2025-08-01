import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import TeamCard from '@/components/common/teams/TeamCard'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import useChallenge from '@/hooks/challenge/useChallenge'
import { useNavigate, useParams } from 'react-router-dom'
import BottomNavigation from '@/components/common/BottomNavigation'

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
          {challenge?.type !== 1 ? null : challenge.teams.length ? (
            challenge.teams.map((team) => (
              <TeamCard
                key={team.id}
                onClick={() => {
                  navigate(`/challenges/${challengeId}/teams/${team.id}`)
                }}
                team={team}
              />
            ))
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center">
                <p className="text-bold text-lg text-[#c0c0c0]">
                  아직 등록된 팀이 없습니다.
                  <br />
                  [홈] - [참여 챌린지]에서
                  <br />
                  가장 먼저 팀을 등록해주세요!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

export default JoinTeam
