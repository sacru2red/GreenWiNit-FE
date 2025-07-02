import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Required from '@/components/common/Required'
import { Input, Textarea } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import PlusIcon from '@mui/icons-material/Add'
import { ForwardedRef, Fragment, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { ko } from 'date-fns/locale/ko'
import { omit } from 'es-toolkit'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

registerLocale('ko', ko)
setDefaultLocale('ko')

interface FormState {
  title: string
  date: Date | null
  image: File | null
  review: string
}

/**
 * 개인 챌린지 인증하기
 */
const ChallengeSubmit = () => {
  const navigate = useNavigate()
  // @TODO add form state
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

    fetch(`/api/v1/challenges/${challengeId}/submit`, {
      method: 'POST',
      body: formData,
    }).then(() => {
      setOpenConfirmDialog(true)
    })
  }

  return (
    <PageContainer>
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
              /* wrapping for removeing gap */
              <div className="w-full">
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date == null ? null : new Date(date))}
                  className={cn(
                    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                  )}
                  wrapperClassName="w-full"
                  dateFormat="yyyy.MM.dd"
                  dateFormatCalendar="yyyy년 M월"
                />
              </div>
            )}
          />
        </Row>
        <Row>
          <h3>
            대표 이미지
            <Required />
          </h3>
          <Controller
            control={f.control}
            name="image"
            rules={{ required: true }}
            render={({ field }) => <InputUploadImage {...field} value={field.value ?? null} />}
          />
        </Row>
        <Row>
          <h3>
            간단한 후기를 남겨주세요.
            <Required />
          </h3>
          <Textarea
            {...f.register('review', { required: true })}
            placeholder="최대 글자수 45자 여러분의 이야기를 작성해주세요."
          />
        </Row>
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
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogContent className="flex flex-col gap-3">
          <DialogContentText className="text-border text-center !text-lg !text-black">
            챌린지 인증 완료
          </DialogContentText>
          <DialogContentText className="text-border !text-light-gray text-center !text-sm">
            당신의 실천이
            <br />더 나은 지구를 만듭니다 :
          </DialogContentText>
          <DialogContentText className="text-border !text-lighter-gray text-center !text-sm">
            * 관리자 확인 후, 포인트가 적립됩니다.
          </DialogContentText>
          <div className="flex w-full flex-row justify-center">
            <Button className="px-8" onClick={() => navigate('/challenges/user/me/joined')}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}

const InputUploadImage = (
  props: Omit<React.ComponentProps<'input'>, 'value'> & { value: File | null },
) => {
  const inputRef = useRef<HTMLInputElement>(
    props.ref && typeof props.ref === 'object' && 'current' in props.ref ? props.ref.current : null,
  )
  const mergedRef = mergeRefs(props.ref, inputRef)

  const imageBlob = inputRef.current?.files?.[0]

  useEffect(() => {
    console.log('imageBlob 2', imageBlob)
    if (imageBlob == null) {
      return
    }
  }, [imageBlob])

  return (
    <div
      className={cn(
        'flex min-h-[15vh] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl',
        imageBlob == null ? 'bg-[#f0f0f0] p-4' : 'max-h-[20vh]',
      )}
      onClick={() => inputRef.current?.click()}
    >
      {imageBlob == null ? (
        <Fragment>
          <div className="rounded-full border-[2px] border-[#3A9B6E] p-2">
            <PlusIcon htmlColor="#3A9B6E" />
          </div>
          <span className="text-bold text-[#666666]">이미지를 업로드 해주세요.</span>
          <span className="text-sm text-[#999999]">권장 크기: 1200 x 800px</span>
        </Fragment>
      ) : (
        <img src={URL.createObjectURL(imageBlob)} alt="uploaded" className="min-h-[15vh]" />
      )}
      <input type="file" className="hidden" {...omit(props, ['value'])} ref={mergedRef} />
    </div>
  )
}

const Row = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('flex w-full flex-col items-start justify-start gap-1.5', className)}>
      {children}
    </div>
  )
}

function mergeRefs<T>(...refs: (ForwardedRef<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    })
  }
}

export default ChallengeSubmit
