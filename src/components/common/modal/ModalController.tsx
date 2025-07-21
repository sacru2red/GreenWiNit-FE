import ConfirmDialog from '@/components/common/modal/ConfirmDialog'
import ResultNoticeDialog from '@/components/common/modal/ResultNoticeDialog'
import { useModalStore } from '@/store/useModalStore'

function ModalController() {
  const { isOpen, modal, setOpen, closeModal } = useModalStore()

  if (!isOpen || !modal) return null

  switch (modal.group) {
    case 'confirm':
      return (
        <ConfirmDialog
          isOpen={isOpen}
          type={modal.type}
          setOpen={setOpen}
          closeModal={closeModal}
          onConfirm={modal.onConfirm}
        />
      )
    case 'notice':
      return (
        <ResultNoticeDialog
          isOpen={isOpen}
          type={modal.type}
          setOpen={setOpen}
          onClick={closeModal}
        />
      )
    default:
      return null
  }
}

export default ModalController
