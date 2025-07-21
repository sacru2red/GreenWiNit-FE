import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import ResultNoticeDialog from '@/components/common/modal/result-notice-dialog'
import { useModalStore } from '@/store/use-modal-store'

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
