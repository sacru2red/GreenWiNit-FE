import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import SubmitEditButton from '@/components/edit-profile-screen/submit-edit-button'
import { FormEvent, useState } from 'react'
import CurrentNickname from './current-nickname'
import InputNickname from './input-nickname'

function NicknameEditForm() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const updateNickname = () => {
    // 닉네임 수정 api 연결 예정
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  return (
    <>
      <section className="w-full flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CurrentNickname />
          <InputNickname />
          <fieldset>
            <legend className="sr-only">제출 버튼</legend>
            <SubmitEditButton />
          </fieldset>
        </form>
      </section>
      {showConfirmModal && (
        <ConfirmDialog
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
          description={`회원정보를\n 수정하시겠습니까?`}
          onConfirm={updateNickname}
        />
      )}
    </>
  )
}

export default NicknameEditForm
