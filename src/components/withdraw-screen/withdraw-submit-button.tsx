import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import ResultNoticeDialog from '@/components/common/modal/notice-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

function WithDrawSubmitButton() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showNoticeModal, setShowNoticeModal] = useState(false)

  // const deleteAccount = async () => {
  // 회원탈퇴 API 연결 로직 추가 예정
  // }

  const onConfirm = async () => {
    // await deleteAccount()
    setShowConfirmModal(false)
    setShowNoticeModal(true)
  }

  return (
    <>
      <div className="flex px-4 py-6">
        <Button size="flex" onClick={() => setShowConfirmModal(true)}>
          회원탈퇴
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmDialog
          description="회원 탈퇴 시, 30일 이내에 재가입이 불가능합니다."
          onConfirm={onConfirm}
        />
      )}
      {showNoticeModal && (
        <ResultNoticeDialog
          description="회원 탈퇴가 정상적으로 완료되었습니다."
          onConfirm={() => setShowNoticeModal(false)}
        />
      )}
    </>
  )
}

export default WithDrawSubmitButton
