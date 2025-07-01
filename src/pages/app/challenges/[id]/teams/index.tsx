import { challengesApi } from '@/api/challenges'
import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import useChallenge from '@/hooks/useChallenge'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import BottomNavigation from '@/components/common/BottomNav'
import TeamCard from '@/components/common/challenges/TeamCard'

const ChallengesTeam = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data: challenge } = useChallenge(id)
  const navigate = useNavigate()

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
              // @TODO B01_007 슬라이드에서 비활성화 기준을 체크하고,
              // mock 서버에서 비활성화 여부를 추가해야 합니다.
              // 그리고 TeamCard 컴포넌트에서 비활성화 여부를 체크해서 비활성화 상태일 때는 비활성화 상태로 표시해야 합니다.
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
          <Button size="flex" onClick={() => navigate(`./join`)}>
            <AssignmentTurnedInOutlinedIcon />팀 선택하기
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
