import { usersApi } from '@/api/users'
import InputProfileImage from '@/components/common/input-profile-image'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import NicknameCheckInput from '@/components/edit-profile-screen/nickname-checkt-input'
import SubmitEditButton from '@/components/edit-profile-screen/submit-edit-button'
import { Fragment, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export interface FormState {
  profileImage: string | null
  nickname: string | null
}

function EditProfileForm() {
  const formDataRef = useRef<FormState | null>(null)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const { control, register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      nickname: null,
      profileImage: null,
    },
  })

  const onSubmit: SubmitHandler<FormState> = (data) => {
    if (!data.nickname) {
      toast.error('닉네임을 입력해주세요.')
      return
    }

    if (!isNicknameChecked) {
      toast.error('닉네임 중복 체크를 해주세요.')
      return
    }

    formDataRef.current = data
    setShowConfirmModal(true)
  }

  const updateNickname = async () => {
    const data = formDataRef.current

    if (!data?.nickname) return

    await usersApi.putUserProfile(
      data.nickname,
      data.profileImage ?? 'https://www.greenwinit.store/img/logo-icon.png',
    )
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col gap-4">
        <fieldset className="mt-8 flex justify-center">
          <legend className="sr-only">프로필 사진 변경</legend>
          <Controller
            control={control}
            name="profileImage"
            render={({ field }) => (
              <div className="self-center">
                <InputProfileImage value={field.value} onChange={field.onChange} />
              </div>
            )}
          />
        </fieldset>
        <fieldset>
          <legend className="sr-only">닉네임 수정</legend>
          <NicknameCheckInput register={register} setIsNicknameChecked={setIsNicknameChecked} />
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
