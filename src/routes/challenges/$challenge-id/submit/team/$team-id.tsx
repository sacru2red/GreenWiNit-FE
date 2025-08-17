import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import 'react-datepicker/dist/react-datepicker.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormState as FormStateDefault } from '@/components/submit-screen/type'
import ImageRow from '@/components/submit-screen/image-row'
import ReviewRow from '@/components/submit-screen/review-row'
import DoneDialog from '@/components/submit-screen/done-dialog'
import { challengesApi } from '@/api/challenges'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/$challenge-id/submit/team/$team-id')({
  component: ChallengeSubmitTeam,
})

function ChallengeSubmitTeam() {
  const f = useForm<FormState>({
    defaultValues: {
      image: null,
      review: '',
    },
  })
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const challengeId = Number(Route.useParams()['challenge-id'])

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { image, review } = data
    if (image == null) {
      throw new Error('image is required')
    }

    challengesApi
      .submitIndividualChallenge(challengeId, {
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

type FormState = Pick<FormStateDefault, 'image' | 'review'>

export default ChallengeSubmitTeam
