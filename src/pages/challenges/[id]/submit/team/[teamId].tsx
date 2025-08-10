import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import 'react-datepicker/dist/react-datepicker.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormState as FormStateDefault } from '@/components/submit-screen/type'
import ImageRow from '@/components/submit-screen/image-row'
import ReviewRow from '@/components/submit-screen/review-row'
import DoneDialog from '@/components/submit-screen/done-dialog'
import { challengesApi } from '@/api/challenges'

type FormState = Pick<FormStateDefault, 'image' | 'review'>

const ChallengeSubmitTeam = () => {
  const f = useForm<FormState>({
    defaultValues: {
      image: null,
      review: '',
    },
  })
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = Number(params.challengeId)

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { image, review } = data
    if (image == null) {
      throw new Error('image is required')
    }

    challengesApi
      .submitChallenge(challengeId, {
        // @CHECK 현재 시간으로 제출하는 것이 맞는지 확인
        date: new Date().toISOString(),
        imageUrl: image,
        review,
      })
      .then(() => {
        setOpenConfirmDialog(true)
      })
  }

  return (
    <PageLayOut.Container bg="form">
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>팀 챌린지 인증</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <form onSubmit={f.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
          <ImageRow control={f.control} purpose="challenge" />
          <ReviewRow control={f.control} />
          <Button
            variant={f.formState.isValid ? 'default' : 'disabled'}
            className="mt-auto text-lg"
            type="submit"
          >
            제출하기
          </Button>
        </form>
      </PageLayOut.BodySection>
      <DoneDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog} />
    </PageLayOut.Container>
  )
}

export default ChallengeSubmitTeam
