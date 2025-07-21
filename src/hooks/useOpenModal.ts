import { useModalStore } from '@/store/use-modal-store'

const useOpenModal = () => {
  const openModal = useModalStore((state) => state.openModal)

  return openModal
}

export default useOpenModal
