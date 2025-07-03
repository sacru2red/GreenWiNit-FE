import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import LogoIcon from '@/components/common/LogoIcon'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <LogoIcon size="large" className="border-1 bg-white" />
          <span className="text-mountain_meadow-700 text-2xl font-bold">{team.name}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-white p-4">
        <div className="flex flex-col gap-1">
          <span className="text-title-smaller text-lg">현재 팀원</span>
          <span className="text-mountain_meadow-700 text-xl font-bold">{`${team.users.length}명`}</span>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="text-title-smaller text-lg font-bold">소개 및 목표</span>
          <p>{team.description}</p>
        </div>
        <div className="bg-mountain_meadow-0 flex flex-col items-start gap-2 rounded-lg p-4">
          <span className="text-mountain_meadow-700 text-lg font-bold">날짜</span>
          <p>{`${team.date}`}</p>
          <span className="text-mountain_meadow-700 text-lg font-bold">시간</span>
          <p>{`${team.startAt} ~ ${team.endAt}`}</p>
          <span className="text-mountain_meadow-700 text-lg font-bold">장소</span>
          <p>{`${team.address.roadAddress}`}</p>
          <span className="text-mountain_meadow-700 text-lg font-bold">채팅방</span>
          <a href={team.openChatUrl} target="_blank" rel="noopener noreferrer">
            {`${team.openChatUrl}`}
          </a>
        </div>
        <p className="text-lighter-gray text-center text-sm">
          * 같은 날짜에는 하나의 챌린지를 두번 이상 참여할 수 없어요!
          <br />
          다른 챌린지에 도전해보세요.
        </p>
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
