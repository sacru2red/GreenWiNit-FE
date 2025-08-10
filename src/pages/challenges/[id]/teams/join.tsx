import ChallengeTitle from '@/components/common/challenges/challenge-title'
import TeamCard from '@/components/common/teams/team-card'
import PageContainer from '@/components/common/page-layout/container'
import PageHeaderSection from '@/components/common/page-layout/header-section'
import PageTitle from '@/components/common/page-title'
import useChallengesTeams from '@/hooks/challenge/use-challenges-teams'
import { useNavigate, useParams } from 'react-router-dom'
import BottomNavigation from '@/components/common/bottom-navigation'

const JoinTeam = () => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = Number(params.challengeId)

  const navigate = useNavigate()
  const { data } = useChallengesTeams(challengeId)
  const teams = data?.result?.content ?? []

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 선택하기</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle challengeId={challengeId} />
        <div className="flex flex-1 flex-col gap-4">
          {teams.length ? (
            teams.map((team) => (
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
