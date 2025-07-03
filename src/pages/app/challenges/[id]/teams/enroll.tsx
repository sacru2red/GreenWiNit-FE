import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Required from '@/components/common/Required'
import { Button } from '@/components/ui/button'
import Input from '@/components/common/form/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import DatePickerSingle from '@/components/common/form/DatePickerSingle'
import { omit } from 'es-toolkit'
import { cn } from '@/lib/utils'
import TimeInput from '@/components/common/form/TimeInput'
import AddressInput from '@/components/common/form/AddressInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useNavigate, useParams } from 'react-router-dom'
import { useMessageStore } from '@/store/messageStore'
import dayjs from 'dayjs'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

interface FormState {
  name: string
  date: Date | null
  startAt: Date | null
  endAt: Date | null
  address: {
    roadAddress: string
    roadnameCode: string
    zonecode: string
    detailAddress: string
    sigungu: string
  }
  description: string
  maxMemberCount: number
  openChatUrl: string
}

const TeamEnroll = () => {
  const { register, handleSubmit, control, formState } = useForm<FormState>()
  const params = useParams<{ challengeId: string }>()
  const challengeId = params.challengeId
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { showMessage } = useMessageStore()
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
      showMessage(error.message)
    },
  })

  const onSubmit: SubmitHandler<FormState> = (data) => {
    enrollTeam(data)
  }

  return (
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>팀 등록하기</PageTitle>
      </PageHeaderSection>
      <form className="flex flex-1 flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <span>
            제목
            <Required />
          </span>
          <Input placeholder="내용을 입력해주세요." {...register('name', { required: true })} />
        </Row>
        <Row>
          <span>
            날짜
            <Required />
          </span>
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => (
              /* wrapping for removing gap */
              <div className="w-full">
                <DatePickerSingle
                  {...omit(field, ['value'])}
                  selected={field.value}
                  placeholderText="내용을 입력해주세요."
                />
              </div>
            )}
          />
        </Row>
        <Row className="flex-row gap-4">
          <div className="flex flex-1 flex-col items-start">
            <span>
              시작시간
              <Required />
            </span>
            <Controller
              control={control}
              name="startAt"
              rules={{ required: true }}
              render={({ field }) => <TimeInput {...field} />}
            />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <span>
              종료시간
              <Required />
            </span>
            <Controller
              control={control}
              name="endAt"
              rules={{ required: true }}
              render={({ field }) => <TimeInput {...field} />}
            />
          </div>
        </Row>
        <Row>
          <span>
            장소
            <Required />
          </span>
          <Controller
            control={control}
            name="address"
            rules={{ required: true }}
            render={({ field }) => (
              <AddressInput
                value={field.value}
                onChange={(v) => {
                  field.onChange(v)
                }}
              />
            )}
          />
        </Row>
        <Row>
          <span>
            소개 및 목표
            <Required />
          </span>
          <Input
            placeholder="내용을 입력해주세요."
            {...register('description', { required: true })}
          />
        </Row>
        <Row>
          <span>
            최대 인원
            <Required />
          </span>
          <Input
            placeholder="숫자를 입력해주세요."
            {...register('maxMemberCount', { required: true, valueAsNumber: true })}
            inputMode="numeric"
          />
        </Row>
        <Row>
          <span>
            오픈채팅방 링크
            <Required />
          </span>
          <Input
            placeholder="링크를 생성해서 넣어주세요."
            {...register('openChatUrl', { required: true })}
          />
        </Row>
        <p className="text-lighter-gray text-center text-sm">
          * 같은 날짜에는 하나의 챌린지를 두번 이상 참여할 수 없어요!
        </p>
        <div className="mt-auto flex">
          <Button size="flex" type="submit" variant={formState.isValid ? 'default' : 'disabled'}>
            등록하기
          </Button>
        </div>
      </form>
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogContent className="flex flex-col gap-4">
          <DialogContentText className="text-border text-bold text-center !text-xl !text-black">
            팀 등록 완료
          </DialogContentText>
          <DialogContentText className="text-border !text-title-smaller text-center !text-sm">
            [홈] -&gt; [나의 챌린지]에서 확인하세요!
            <br />
            오픈 채팅방을 통해 이야기를 나눠요.
          </DialogContentText>
          <div className="flex w-full flex-row justify-center">
            <Button
              className="px-8 py-3"
              onClick={() => navigate(`/challenges/${challengeId}/teams`)}
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

const Row = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex w-full flex-col items-start gap-1', className)}>{children}</div>
}

export default TeamEnroll
