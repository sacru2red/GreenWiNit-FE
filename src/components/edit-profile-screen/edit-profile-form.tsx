import { usersApi, usersQueryKeys } from '@/api/users'
import InputProfileImage from '@/components/common/input-profile-image'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import CurrentNickname from '@/components/edit-profile-screen/nickname-checkt-input/current-nickname'
import InputNickname from '@/components/edit-profile-screen/nickname-checkt-input/input-nickname'
import SubmitEditButton from '@/components/edit-profile-screen/submit-edit-button'
import useUserMe from '@/hooks/use-user-me'
import { useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export interface FormState {
  profileImage: string | null
  nickname: string | null
}

function EditProfileForm() {
  const [pendingData, setPendingData] = useState<FormState | null>(null)
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { data: me } = useUserMe({ refetchOnWindowFocus: false, refetchOnMount: false })
  const userNickname = me?.result?.nickname ?? null
  const qc = useQueryClient()

  const { control, handleSubmit, reset } = useForm<FormState>({
    defaultValues: {
      nickname: null,
      profileImage: null,
    },
  })

  useEffect(() => {
    if (me) {
      reset({
        nickname: null,
        profileImage: me.result?.profileImageUrl ?? null,
      })
    }
  }, [me, reset])

  const onSubmit: SubmitHandler<FormState> = (data) => {
    if (!data.nickname) {
      toast.error('닉네임을 입력해 주세요.')
      return
    }

    if (!isNicknameDuplicated) {
      toast.error('닉네임 중복 체크를 해주세요.')
      return
    }

    setPendingData(data)
    setShowConfirmModal(true)
  }

  const updateNickname = async () => {
    if (!pendingData?.nickname) return

    const res = await usersApi.putUserProfile(pendingData.nickname, pendingData.profileImage ?? '')
    if (res.success) {
      setShowConfirmModal(false)
      await qc.invalidateQueries({
        queryKey: usersQueryKeys['users/me']['member'].queryKey,
        refetchType: 'active',
      })
      toast.success('회원정보가 수정되었습니다.')
    }
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
          <section className="flex w-full flex-col gap-2">
            <CurrentNickname nickname={userNickname} />
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <InputNickname
                  mode="edit"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    field.onChange(e)
                    setIsNicknameDuplicated(false) // 입력 바뀌면 중복확인 다시 하도록 유도
                  }}
                  setIsNicknameDuplicated={setIsNicknameDuplicated}
                />
              )}
            ></Controller>
          </section>
        </fieldset>
        <fieldset className="mt-auto flex w-full">
          <legend className="sr-only">제출</legend>
          <SubmitEditButton isNicknameDuplicated={isNicknameDuplicated} />
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
