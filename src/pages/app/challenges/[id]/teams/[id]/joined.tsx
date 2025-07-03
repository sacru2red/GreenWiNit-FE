import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Description from '@/components/common/teams/Description'
import MemberCount from '@/components/common/teams/MemberCount'
import Overview from '@/components/common/teams/Overview'
import PropertyList from '@/components/common/teams/PropertyList'
import { Button } from '@/components/ui/button'
import useChallengesTeam from '@/hooks/useChallengesTeam'
import { useNavigate, useParams } from 'react-router-dom'

/**
 *
 * index 페이지와 비슷하지만, manage 기능이 가능한 페이지
 */
const ManageTeam = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = params.challengeId
  const teamId = params.teamId

  const navigate = useNavigate()

  const { data: team, isLoading } = useChallengesTeam(challengeId, teamId)

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
          {/* @TODO attach click event handler to move page */}
          <Button size="flex" onClick={() => navigate(`/challenges/${challengeId}/submit`)}>
            챌린지 인증하기
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default ManageTeam
