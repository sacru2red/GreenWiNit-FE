import WithDrawCaution from '@/components/withdraw-screen/withdraw-caution'
import WithDrawReasonForm from '@/components/withdraw-screen/withdraw-reason-field'
import NoticeMessage from '@/components/withdraw-screen/notice-message'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useForm } from 'react-hook-form'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import { useRef, useState } from 'react'
import ResultNoticeDialog from '@/components/common/modal/notice-dialog'
import { usersApi } from '@/api/users'
import { initHistoryAndLocation } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export type Reasons =
  | 'SERVICE_DISSATISFACTION'
  | 'POLICY_DISAGREEMENT'
  | 'PRIVACY_CONCERN'
  | 'PRIVACY_PROTECTION'
  | 'OTHER'

export interface WithDrawnFormState {
  reasonType: string
  customReason: string | null
}

function WithDraw() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [cautionIsChecked, setCautionIsChecked] = useState(false)
  const dataRef = useRef<WithDrawnFormState | null>(null)

  const { register, handleSubmit } = useForm<WithDrawnFormState>()

  const onConfirm = async () => {
    if (!dataRef.current) return

    const res = await usersApi.withdraw(dataRef.current)

    if (res.success) {
      initHistoryAndLocation()
      setShowConfirmModal(false)
      setShowNoticeModal(true)
    }
  }

  const onSubmit = (data: WithDrawnFormState) => {
    if (!data.reasonType[0]) {
      toast.error('탈퇴 이유를 선택해 주세요!')
      return
    }

    if (!cautionIsChecked) {
      toast.error('동의 항목에 체크해 주세요.')
      return
    }

    if (data.reasonType.includes('OTHER') && !data.customReason) {
      toast.error('기타 이유를 입력해주세요.')
      return
    }

    if (!data.reasonType.includes('OTHER') && !data.customReason) {
      data.customReason = null
    }

    dataRef.current = data
    setShowConfirmModal(true)
  }

  return (
    <>
      <MyPageLayout title="회원 탈퇴">
        <NoticeMessage />
        <form onSubmit={handleSubmit(onSubmit)}>
          <WithDrawReasonForm register={register} />
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
          description={`회원 탈퇴 시, 30일 이내에\n재가입이 불가능합니다.`}
          onConfirm={onConfirm}
        />
      )}
      {showNoticeModal && (
        <ResultNoticeDialog
          isOpen={showNoticeModal}
          setIsOpen={setShowNoticeModal}
          description={`회원 탈퇴가\n정상적으로 완료되었습니다.`}
          onConfirm={() => setShowNoticeModal(false)}
        />
      )}
    </>
  )
}

export default WithDraw
