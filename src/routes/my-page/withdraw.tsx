import WithDrawCaution from '@/components/withdraw-screen/withdraw-caution'
import WithdrawReasonField from '@/components/withdraw-screen/withdraw-reason-field'
import NoticeMessage from '@/components/withdraw-screen/notice-message'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { FieldErrors, useForm } from 'react-hook-form'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import { useRef, useState } from 'react'
import ResultNoticeDialog from '@/components/common/modal/notice-dialog'
import { usersApi } from '@/api/users'
import { initHistoryAndLocation } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '@/components/common/button'
import { createFileRoute } from '@tanstack/react-router'
import { WithDrawnFormState } from '@/types/withdraw'
import { useMutation } from '@tanstack/react-query'
import { showMessageIfExists } from '@/lib/error'

export const Route = createFileRoute('/my-page/withdraw')({
  component: WithDraw,
})

function WithDraw() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [cautionIsChecked, setCautionIsChecked] = useState(false)
  const dataRef = useRef<WithDrawnFormState | null>(null)

  const { register, handleSubmit } = useForm<WithDrawnFormState>()

  const { mutateAsync: withdraw } = useMutation({
    mutationFn: (data: WithDrawnFormState) => usersApi.withdraw(data),
    onSuccess: () => {
      setShowConfirmModal(false)
      setShowNoticeModal(true)
    },
    onError: (err: Error) => {
      console.error(err)
      showMessageIfExists(err)
    },
  })

  const onConfirm = async () => {
    if (!dataRef.current) return
    await withdraw(dataRef.current)
  }

  const onValid = (data: WithDrawnFormState) => {
    if (!cautionIsChecked) {
      toast.error('동의 항목에 체크해 주세요.')
      return
    }

    dataRef.current = data
    setShowConfirmModal(true)
  }

  const onInvalid = (errors: FieldErrors<WithDrawnFormState>) => {
    if (errors.reasonTypes) {
      toast.error(errors.reasonTypes.message)
    }
    if (errors.customReason) {
      toast.error(errors.customReason.message)
    }
  }

  return (
    <>
      <MyPageLayout title="회원 탈퇴">
        <NoticeMessage />
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <WithdrawReasonField register={register} />
          <WithDrawCaution setChecked={setCautionIsChecked} />
          <div className="flex px-4 py-6">
            <Button size="flex" type="submit">
              회원탈퇴
            </Button>
          </div>
        </form>
      </MyPageLayout>
      {showConfirmModal && (
        <ConfirmDialog
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
          description={`회원 탈퇴 시,\n 재가입이 불가능합니다.`}
          onConfirm={onConfirm}
        />
      )}
      {showNoticeModal && (
        <ResultNoticeDialog
          isOpen={showNoticeModal}
          setIsOpen={setShowNoticeModal}
          description={`회원 탈퇴가\n정상적으로 완료되었습니다.`}
          onConfirm={() => {
            initHistoryAndLocation()
            setShowNoticeModal(false)
          }}
        />
      )}
    </>
  )
}

export type Reasons =
  | 'SERVICE_DISSATISFACTION'
  | 'POLICY_DISAGREEMENT'
  | 'PRIVACY_CONCERN'
  | 'PRIVACY_PROTECTION'
  | 'OTHER'

export default WithDraw
