import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
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
  const challengeId = params.challengeId
  const teamId = params.teamId

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { image, review } = data
    if (image == null) {
      throw new Error('image is required')
    }
    const formData = new FormData()
    formData.append('image', image)
    formData.append('review', review)

    challengesApi.submitTeamChallenge(challengeId, teamId, formData).then(() => {
      setOpenConfirmDialog(true)
    })
  }

  return (
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 챌린지 인증</PageTitle>
      </PageHeaderSection>
      <form onSubmit={f.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4 p-4">
        <ImageRow control={f.control} />
        <ReviewRow control={f.control} />
        <Button
          variant={f.formState.isValid ? 'default' : 'disabled'}
          className="mt-auto text-lg"
          type="submit"
        >
          제출하기
        </Button>
      </form>
      <DoneDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog} />
    </PageContainer>
  )
}

export default ChallengeSubmitTeam
