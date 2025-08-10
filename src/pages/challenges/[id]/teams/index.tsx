import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import ChallengeTitle from '@/components/common/challenges/challenge-title'
import PageContainer from '@/components/common/page-layout/container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/ui/button'
import useChallenge from '@/hooks/challenge/use-challenge'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { SquareCheckBig } from 'lucide-react'
import { Users as GroupsIcon } from 'lucide-react'
import BottomNavigation from '@/components/common/bottom-navigation'
import TeamCard from '@/components/common/teams/team-card'

const ChallengesTeam = () => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = Number(params.challengeId)
  const { data: challenge } = useChallenge(challengeId)
  const navigate = useNavigate()

  const { data: joinedTeams } = useQuery({
    queryKey: challengesQueryKeys.challenges.joinedTeams(challengeId).queryKey,
    queryFn: () => challengesApi.getJoinedTeamsMine(challengeId),
    enabled: challengeId != null,
    select: (data) => data.result?.content ?? [],
  })

  if (challengeId == null || challenge == null || challenge.type !== 'TEAM') {
    return <div>Service Unavailable</div>
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>나의 팀</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle challengeId={challengeId} />
        {joinedTeams?.length ? (
          <div className="flex flex-col gap-4">
            {joinedTeams.map((team) => (
              <TeamCard key={team.id} team={team} onClick={() => navigate(`./${team.id}/joined`)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 items-center justify-center">
              <span className="text-bold text-lg text-[#c0c0c0]">
                팀을 선택하거나 등록해주세요.
              </span>
            </div>
          </div>
        )}
        <div className="mt-auto flex w-full gap-2">
          <Button size="flex" onClick={() => navigate(`./join`)}>
            <SquareCheckBig />팀 선택하기
          </Button>
          <Button size="flex" onClick={() => navigate(`./enroll`)}>
            <GroupsIcon />팀 등록하기
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

export default ChallengesTeam
