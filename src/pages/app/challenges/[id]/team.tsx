import { challengesApi, Team } from '@/api/challenges'
import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import useChallenge from '@/hooks/useChallenge'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import BottomNavigation from '@/components/common/BottomNav'

const ChallengesTeam = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data: challenge } = useChallenge(id)

  const { data: joinedTeams } = useQuery({
    queryKey: ['joinedTeams', id],
    queryFn: () => challengesApi.getJoinedTeamsMine(id),
  })

  if (id == null || challenge == null || challenge.type !== 1) {
    return <div>Service Unavailable</div>
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>나의 팀</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle title={challenge?.name} />
        {joinedTeams?.length ? (
          <div className="flex flex-col gap-4">
            {joinedTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
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
          <Button size="flex">
            <AssignmentTurnedInOutlinedIcon />팀 선택하기
          </Button>
          <Button size="flex">
            <GroupsIcon />팀 등록하기
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

interface TeamCardProps {
  team: Team
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="flex flex-col gap-8 rounded rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-row items-center justify-between gap-1">
        <span className="text-title-smaller text-lg font-bold">{team.name}</span>
        <span className="text-lighter-gray">{team.date}</span>
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="flex gap-2">
          <span className="text-title-smaller">시간</span>
          <span className="text-lighter-gray">
            {team.startAt} ~ {team.endAt}
          </span>
        </div>
        <div className="flex w-full flex-row justify-between gap-2">
          <div className="flex gap-2">
            <span className="text-title-smaller">장소</span>
            <span className="text-lighter-gray">{team.address.roadAddress}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-title-smaller">인원</span>
            <span className="text-lighter-gray">
              {team.users.length} / {team.maxMemberCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengesTeam
