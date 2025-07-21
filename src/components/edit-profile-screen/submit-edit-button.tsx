import { MouseEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/store/useModalStore'

function SubmitEditButton() {
  const { openModal } = useModalStore()

  const onSubmit = () => {
    // 회원 정보 수정 API 연결 로직 추가 예정
  }

  const showConfirmModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    openModal({ group: 'confirm', type: 'edit-profile', onConfirm: onSubmit })
  }

  return (
    <div className="absolute bottom-4 left-0 mt-[168px] flex w-full px-4 py-6">
      <Button size="flex" type="submit" onClick={showConfirmModal}>
        수정하기
      </Button>
    </div>
  )
}

export default SubmitEditButton
