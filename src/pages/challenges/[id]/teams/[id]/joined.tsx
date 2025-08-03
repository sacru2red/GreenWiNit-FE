import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import Description from '@/components/common/teams/description'
import MemberCount from '@/components/common/teams/member-count'
import Overview from '@/components/common/teams/overview'
import PropertyList from '@/components/common/teams/property-list'
import { Button } from '@/components/ui/button'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'
import { useNavigate, useParams } from 'react-router-dom'

/**
 *
 * index 페이지와 비슷하지만, manage 기능이 가능한 페이지
 */
const ManageTeam = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = Number(params.challengeId)
  const teamId = Number(params.teamId)

  const navigate = useNavigate()

  const { data, isLoading } = useChallengesTeam(challengeId, teamId)
  const team = data?.result

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (team == null) {
    // @TODO redirect to 404 page
    return <div>Service Unavailable</div>
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 정보</PageTitle>
      </PageHeaderSection>
      <Overview team={team} allowManage />
      <div className="flex flex-1 flex-col gap-4 bg-white p-4">
        <MemberCount team={team} />
        <Description team={team} />
        <PropertyList team={team} />
        <div className="mt-auto flex w-full">
          <Button
            size="flex"
            onClick={() => navigate(`/challenges/${challengeId}/submit/teams/${teamId}`)}
          >
            챌린지 인증하기
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default ManageTeam
