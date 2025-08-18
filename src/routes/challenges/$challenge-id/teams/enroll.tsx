import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/common/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog'
import UpsertPageBody from '@/components/common/teams/upsert-page-body'
import { FormState, UpsertPageBodyProps } from '@/components/common/teams/upsert-page-body/types'

export const Route = createFileRoute('/challenges/$challenge-id/teams/enroll')({
  component: TeamEnroll,
})

function TeamEnroll() {
  const challengeId = Number(Route.useParams()['challenge-id'])
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { mutate: enrollTeam } = useMutation({
    mutationFn: (team: FormState) =>
      challengesApi.enrollTeam(challengeId, {
        ...team,
        beginDateTime: dayjs(team.startAt).format('YYYY-MM-DD HH:mm'),
        endDateTime: dayjs(team.endAt).format('YYYY-MM-DD HH:mm'),
        groupName: team.name,
        roadAddress: team.address.roadAddress,
        detailAddress: team.address.detailAddress,
        description: team.description,
        maxParticipants: team.maxMemberCount,
        startTime: dayjs(team.startAt).format('HH:mm'),
        endTime: dayjs(team.endAt).format('HH:mm'),
        sigungu: team.address.sigungu,
        challengeDate: dayjs(team.date).format('YYYY-MM-DD'),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.list({
          challengeType: 'team',
        }).queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.challenges.detail({
          id: challengeId,
          challengeType: 'team',
        }).queryKey,
      })
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
    <PageLayOut.Container bg="form">
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>팀 등록하기</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection>
          <UpsertPageBody mode="enroll" onSubmit={onSubmit} />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>팀 등록 완료</DialogTitle>
          </DialogHeader>
          <DialogDescription className="!text-title-smaller text-center !text-sm">
            [홈] -&gt; [나의 챌린지]에서 확인하세요!
            <br />
            오픈 채팅방을 통해 이야기를 나눠요.
          </DialogDescription>
          <div className="flex w-full flex-row justify-center">
            <Button size="sm" onClick={() => navigate({ to: `/challenges/${challengeId}/teams` })}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayOut.Container>
  )
}

export default TeamEnroll
