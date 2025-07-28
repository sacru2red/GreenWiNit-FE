import InputProfileImage from '@/components/common/input-profile-image'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import NicknameEditForm from '@/components/edit-profile-screen/nickname-form'
import SubmitEditButton from '@/components/edit-profile-screen/submit-edit-button'
import { profile } from 'console'
import { FormEvent, Fragment, useState } from 'react'

function EditProfileForm() {
  const [profileImage, setProfileImage] = useState('')
  const [nicknameIsAvailable, _] = useState(false) // 닉네임 중복 체크 api 만들어지면 NicknameEditForm에 들어갈 예정
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const updateNickname = async () => {
    if (!profile && !nicknameIsAvailable) return
    // 프로필 수정 api 연결 예정
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-4">
        <fieldset className="mt-8 flex justify-center">
          <legend className="sr-only">프로필 사진 변경</legend>
          <InputProfileImage src={profileImage} setSrc={setProfileImage} />
        </fieldset>
        <fieldset>
          <legend className="sr-only">닉네임 수정</legend>
          <NicknameEditForm />
        </fieldset>
        <fieldset className="mt-auto flex w-full">
          <legend className="sr-only">제출</legend>
          <SubmitEditButton />
        </fieldset>
      </form>
      {showConfirmModal && (
        <ConfirmDialog
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
          description={`회원정보를\n 수정하시겠습니까?`}
          onConfirm={updateNickname}
        />
      )}
    </Fragment>
  )
}

export default EditProfileForm
