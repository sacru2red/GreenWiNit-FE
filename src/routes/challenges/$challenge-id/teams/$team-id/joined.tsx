import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Description from '@/components/common/teams/description'
import MemberCount from '@/components/common/teams/member-count'
import Overview from '@/components/common/teams/overview'
import PropertyList from '@/components/common/teams/property-list'
import { Button } from '@/components/ui/button'
import dayjs from '@/constant/globals'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/challenges/$challenge-id/teams/$team-id/joined')({
  component: ManageTeam,
})

/**
 *
 * index 페이지와 비슷하지만, manage 기능이 가능한 페이지
 */
function ManageTeam() {
  const params = Route.useParams()
  const challengeId = Number(params['challenge-id'])
  const teamId = Number(params['team-id'])

  const navigate = useNavigate()

  const { data, isLoading } = useChallengesTeam(teamId)
  const team = data?.result

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (team == null) {
    // @TODO redirect to 404 page
    return <div>Service Unavailable</div>
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>팀 정보</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection bg="form" padding="zero" className="m-0">
        {/* @TODO apply https://github.com/GreenWiNit/backend/issues/274 */}
        <Overview team={team} allowManage challengeId={challengeId} />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <MemberCount team={team} />
          <Description team={team} />
          <PropertyList team={team} />
          <div className="mt-auto flex w-full">
            <Button
              size="flex"
              onClick={() => {
                if (dayjs(team.challengeDate).isAfter(dayjs())) {
                  toast.error(
                    `팀 챌린지 날짜(${dayjs(team.challengeDate).format('YYYY-MM-DD')})부터 인증할 수 있습니다.`,
                  )
                  return
                }
                navigate({ to: `/challenges/${challengeId}/submit/team/${teamId}` })
              }}
            >
              챌린지 인증하기
            </Button>
          </div>
        </div>
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

export default ManageTeam
