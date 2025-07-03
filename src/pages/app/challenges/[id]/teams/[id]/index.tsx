import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Description from '@/components/common/teams/Description'
import MemberCount from '@/components/common/teams/MemberCount'
import Overview from '@/components/common/teams/Overview'
import PropertyList from '@/components/common/teams/PropertyList'
import { Button } from '@/components/ui/button'
import useChallengesTeam from '@/hooks/useChallengesTeam'
import { useMessageStore } from '@/store/messageStore'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TeamDetail = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = params.challengeId
  const teamId = params.teamId

  const queryClient = useQueryClient()
  const { showMessage } = useMessageStore()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const navigate = useNavigate()

  const { data: team, isLoading } = useChallengesTeam(challengeId, teamId)
  const { mutate: joinTeam } = useMutation({
    mutationFn: () => challengesApi.joinTeam(challengeId, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.list().queryKey })
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.detail(challengeId).queryKey })
      setOpenConfirmDialog(true)
    },
    onError(error) {
      console.error(error)
      showMessage(error.message)
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
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogContent className="flex flex-col gap-3">
          <DialogContentText className="text-border text-center !text-lg !text-black">
            팀 가입 완료
          </DialogContentText>
          <DialogContentText className="text-border !text-light-gray text-center !text-sm">
            [홈] -&gt; [참여 챌린지]에서 확인하세요!
            <br />
            오픈채팅방을 통해 이야기를 나눠요.
          </DialogContentText>
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
