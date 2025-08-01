import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import UpsertPageBody from '@/components/common/teams/upsert-page-body'
import { FormState, UpsertPageBodyProps } from '@/components/common/teams/upsert-page-body/types'

const TeamEnroll = () => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { mutate: enrollTeam } = useMutation({
    mutationFn: (team: FormState) =>
      challengesApi.enrollTeam(challengeId, {
        ...team,
        startAt: dayjs(team.startAt).format('HH:mm'),
        endAt: dayjs(team.endAt).format('HH:mm'),
        date: dayjs(team.date).format('YYYY-MM-DD'),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.list().queryKey })
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.detail(challengeId).queryKey })
      setShowConfirmDialog(true)
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

  const onSubmit: UpsertPageBodyProps['onSubmit'] = (data) => {
    enrollTeam(data)
  }

  return (
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 등록하기</PageTitle>
      </PageHeaderSection>
      <UpsertPageBody mode="enroll" onSubmit={onSubmit} />
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="flex flex-col gap-4">
          <DialogDescription className="text-border text-bold text-center !text-xl !text-black">
            팀 등록 완료
          </DialogDescription>
          <DialogDescription className="text-border !text-title-smaller text-center !text-sm">
            [홈] -&gt; [나의 챌린지]에서 확인하세요!
            <br />
            오픈 채팅방을 통해 이야기를 나눠요.
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

export default TeamEnroll
