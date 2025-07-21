import { Button } from '@/components/ui/button'
import useOpenModal from '@/hooks/useOpenModal'

function WithDrawSubmitButton() {
  const openModal = useOpenModal()

  const onSubmit = () => {
    // 회원탈퇴 API 연결 로직 추가 예정
  }

  const showConfirmModal = () => {
    openModal({
      group: 'confirm',
      type: 'withdraw',
      onConfirm: onSubmit,
    })
  }

  return (
    <div className="flex px-4 py-6">
      <Button size="flex" onClick={showConfirmModal}>
        회원탈퇴
      </Button>
    </div>
  )
}

export default WithDrawSubmitButton
