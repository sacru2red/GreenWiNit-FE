import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import BottomNavigation from '@/components/common/BottomNav'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { useState } from 'react'
import { toast } from 'sonner'
import ChallengeTitle from '@/components/common/challenges/ChallengeTitle'
import useChallenge from '@/hooks/challenge/useChallenge'

const ChallengeDetail = () => {
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId
  const navigate = useNavigate()
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
  const queryClient = useQueryClient()

  const { data: challenge } = useChallenge(challengeId)

  const { mutate: joinChallenge } = useMutation({
    mutationFn: (pId: string) => challengesApi.joinChallenge(pId),
    onSuccess: () => {
      setOpenSuccessDialog(true)
      queryClient.invalidateQueries({
        queryKey: challengesQueryKeys.detail(challengeId).queryKey,
      })
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>{`${challenge?.typeKo} 챌린지 상세보기`}</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChallengeTitle title={challenge?.name} />
        <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4">
          <img
            src={challenge?.thumbnailUrl}
            alt={challenge?.name}
            className="w-full rounded-xl object-cover"
          />
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-lg font-bold">기본정보</h3>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                기간
                <br />
                <span className="text-card-base">
                  {challenge == null
                    ? null
                    : `${dayjs(challenge.startAt).format('YYYY.MM.DD')} ~ ${dayjs(challenge.endAt).format('YYYY.MM.DD')}`}
                </span>
              </p>
            </div>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                참여방법
                <br />
                <span className="text-card-base">
                  {challenge == null ? null : challenge.howToJoin}
                </span>
              </p>
            </div>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                포인트
                <br />
                <span className="text-card-base">
                  {challenge == null ? null : `${challenge.point}P (1회 인증 기준)`}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-auto"
          onClick={() => {
            if (challengeId == null) {
              return
            }
            joinChallenge(challengeId)
          }}
        >
          챌린지 참여하기
        </Button>
      </div>
      <BottomNavigation />
      <Dialog open={openSuccessDialog} onOpenChange={() => setOpenSuccessDialog(false)}>
        <DialogContent className="flex flex-col gap-3">
          <DialogDescription className="text-border text-center !text-lg !text-black">
            챌린지 참여 완료
          </DialogDescription>
          <DialogDescription className="text-border !text-light-gray text-center !text-sm">
            [홈] -&gt; [참여 챌린지]에서
            <br />
            챌린지를 인증해보세요!
          </DialogDescription>
          <div className="flex w-full flex-row justify-center">
            <Button size="sm" onClick={() => navigate('/challenges/user/me/joined')}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

export default ChallengeDetail
