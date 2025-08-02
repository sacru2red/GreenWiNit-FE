import Required from '@/components/common/required'
import Input from '@/components/common/form/input'
import { Controller, useForm } from 'react-hook-form'
import DatePickerSingle from '@/components/common/form/date-picker-single'
import { omit } from 'es-toolkit'
import TimeInput from '@/components/common/form/time-input'
import AddressInput from '@/components/common/form/address-input'
import { Button } from '@/components/ui/button'
import { FormState, UpsertPageBodyProps } from './types'
import Row from '@/components/common/form/row'

const UpsertPageBody = ({ onSubmit, mode, initialData }: UpsertPageBodyProps) => {
  const { register, handleSubmit, control, formState } = useForm<FormState>({
    defaultValues: initialData ?? {
      id: null,
      name: '',
      date: null,
      startAt: null,
      endAt: null,
      address: {
        roadAddress: '',
        roadnameCode: '',
        zonecode: '',
        detailAddress: '',
        sigungu: '',
      },
      description: '',
      maxMemberCount: 0,
    },
  })

  return (
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
              <DatePickerSingle {...omit(field, ['value'])} selected={field.value} />
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
      {mode === 'enroll' && (
        <p className="text-lighter-gray text-center text-sm">
          * 같은 날짜에는 하나의 챌린지를 두번 이상 참여할 수 없어요!
        </p>
      )}
      <div className="mt-auto flex">
        <Button size="flex" type="submit" variant={formState.isValid ? 'default' : 'disabled'}>
          {mode === 'enroll' ? '등록하기' : '수정하기'}
        </Button>
      </div>
    </form>
  )
}

export default UpsertPageBody
