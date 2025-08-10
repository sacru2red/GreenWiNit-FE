import PageContainer from '@/components/common/page-layout/container'
import PageHeaderSection from '@/components/common/page-layout/header-section'
import PageTitle from '@/components/common/page-title'
import Required from '@/components/common/required'
import Input from '@/components/common/form/input'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import DatePickerSingle from '@/components/common/form/date-picker-single'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Row from '@/components/common/form/row'
import { FormState } from '@/components/submit-screen/type'
import ImageRow from '@/components/submit-screen/image-row'
import ReviewRow from '@/components/submit-screen/review-row'
import DoneDialog from '@/components/submit-screen/done-dialog'
import { challengesApi } from '@/api/challenges'
import useChallenge from '@/hooks/challenge/use-challenge'

const ChallengeSubmitIndividual = () => {
  const f = useForm<FormState>({
    defaultValues: {
      date: null,
      image: null,
      review: '',
    },
  })
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const params = useParams<{ challengeId: string }>()
  const challengeId = Number(params.challengeId)
  const { data: challenge } = useChallenge(challengeId)

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { date, image, review } = data
    if (date == null) {
      throw new Error('date is required')
    }
    if (image == null) {
      throw new Error('image is required')
    }

    challengesApi
      .submitChallenge(challengeId, {
        date: date.toISOString(),
        imageUrl: image,
        review,
      })
      .then(() => {
        setOpenConfirmDialog(true)
      })
  }

  return (
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>개인 챌린지 인증</PageTitle>
      </PageHeaderSection>
      <form onSubmit={f.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4 p-4">
        <Row>
          <h3>
            제목
            <Required />
          </h3>
          <Input value={challenge?.title ?? ''} contentEditable={false} />
        </Row>
        <Row>
          <h3>
            날짜
            <Required />
          </h3>
          <Controller
            control={f.control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => (
              /* wrapping for removing gap */
              <div className="w-full">
                <DatePickerSingle
                  selected={field.value}
                  onChange={(date) => field.onChange(date == null ? null : new Date(date))}
                />
              </div>
            )}
          />
        </Row>
        <ImageRow control={f.control} purpose="challenge" />
        <ReviewRow control={f.control} />
        <p className="text-lighter-gray w-full text-center text-sm">
          ※ 하나의 챌린지는 하루에 한번만 인증할 수 있어요!
          <br />
          다른 챌린지에 도전해보세요!
        </p>
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

export default ChallengeSubmitIndividual
