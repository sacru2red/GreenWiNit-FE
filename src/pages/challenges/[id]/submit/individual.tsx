import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Required from '@/components/common/Required'
import Input from '@/components/common/form/Input'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import DatePickerSingle from '@/components/common/form/DatePickerSingle'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Row from '@/components/common/form/Row'
import { FormState } from '@/components/submit-screen/type'
import ImageRow from '@/components/submit-screen/ImageRow'
import ReviewRow from '@/components/submit-screen/ReviewRow'
import DoneDialog from '@/components/submit-screen/DoneDialog'
import { challengesApi } from '@/api/challenges'

const ChallengeSubmitIndividual = () => {
  const f = useForm<FormState>({
    defaultValues: {
      title: '',
      date: null,
      image: null,
      review: '',
    },
  })
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { title, date, image, review } = data
    if (date == null) {
      throw new Error('date is required')
    }
    if (image == null) {
      throw new Error('image is required')
    }
    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', date.toISOString())
    formData.append('image', image)
    formData.append('review', review)

    challengesApi.submitIndividualChallenge(challengeId, formData).then(() => {
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
          <Input {...f.register('title', { required: true })} />
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
        <ImageRow control={f.control} />
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
