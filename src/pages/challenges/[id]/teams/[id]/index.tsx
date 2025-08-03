import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import Description from '@/components/common/teams/description'
import MemberCount from '@/components/common/teams/member-count'
import Overview from '@/components/common/teams/overview'
import PropertyList from '@/components/common/teams/property-list'
import { Button } from '@/components/ui/button'
import useChallengesTeam from '@/hooks/challenge/use-challenges-team'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TeamDetail = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = Number(params.challengeId)
  const teamId = params.teamId

  const queryClient = useQueryClient()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const navigate = useNavigate()

  const { data: team, isLoading } = useChallengesTeam(challengeId, teamId)
  const { mutate: joinTeam } = useMutation({
    mutationFn: () => challengesApi.joinTeam(challengeId, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.list({
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail(Number(challengeId)).queryKey,
      })
      setOpenConfirmDialog(true)
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

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
      <Overview team={team} />
      <div className="flex flex-1 flex-col gap-4 bg-white p-4">
        <MemberCount team={team} />
        <Description team={team} />
        <PropertyList team={team} />
        <div className="mt-auto flex w-full">
          <Button size="flex" onClick={() => joinTeam()}>
            팀 가입신청
          </Button>
        </div>
      </div>
      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent className="flex flex-col gap-3">
          <DialogDescription className="text-border text-center !text-lg !text-black">
            팀 가입 완료
          </DialogDescription>
          <DialogDescription className="text-border !text-light-gray text-center !text-sm">
            [홈] -&gt; [참여 챌린지]에서 확인하세요!
            <br />
            오픈채팅방을 통해 이야기를 나눠요.
          </DialogDescription>
          <div className="flex w-full flex-row justify-center">
            <Button size="sm" onClick={() => navigate(`/challenges/${challengeId}/teams`)}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

export default TeamDetail
