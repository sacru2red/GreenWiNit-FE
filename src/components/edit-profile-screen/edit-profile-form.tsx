import { usersApi, usersQueryKeys } from '@/api/users'
import { Button } from '@/components/common/button'
import InputProfileImage from '@/components/common/input-profile-image'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import CurrentNickname from '@/components/edit-profile-screen/nickname-checkt-input/current-nickname'
import InputNickname from '@/components/edit-profile-screen/nickname-checkt-input/input-nickname'
import useUserMe from '@/hooks/use-user-me'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const [hasTriedDuplicateCheck, setHasTriedDuplicateCheck] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { data: me } = useUserMe({ refetchOnWindowFocus: false, refetchOnMount: false })
  const userNickname = me?.result?.nickname ?? null
  const qc = useQueryClient()
  const { control, handleSubmit, reset, formState } = useForm<FormState>({
    defaultValues: {
      nickname: null,
      profileImage: null,
    },
  })
  const isNicknameValid = hasTriedDuplicateCheck && !isNicknameDuplicated
  const isImageValid = formState.dirtyFields.profileImage

  useEffect(() => {
    if (me) {
      reset({
        nickname: null,
        profileImage: me.result?.profileImageUrl ?? null,
      })
    }
  }, [me, reset])

  const onSubmit: SubmitHandler<FormState> = (data) => {
    if (!data.profileImage && !data.nickname) {
      toast.error('닉네임을 입력해 주세요.')
      return
    }

    if (isNicknameDuplicated) {
      // diabled로 설정되어 form 제출 불가능
      toast.error(
        '(정상적인 접근이 아닙니다.) 닉네임이 중복되었습니다. 새 닉네임을 입력하고 중복확인해보세요.',
      )
      return
    }

    if (!hasTriedDuplicateCheck) {
      toast.error('닉네임 중복확인을 해주세요')
      return
    }

    setPendingData(data)
    setShowConfirmModal(true)
  }

  const { mutate } = useMutation({
    mutationFn: (vars: { nickname: string | null; profileImage: string | null }) =>
      usersApi.putUserProfile(vars.nickname, vars.profileImage),

    // 성공 시: 모달 닫기 + 캐시 무효화 + 토스트
    onSuccess: async () => {
      setShowConfirmModal(false)
      await qc.invalidateQueries({
        queryKey: usersQueryKeys['users/me']['member'].queryKey,
        refetchType: 'active',
      })
      toast.success('회원정보가 수정되었습니다.')
    },

    onError: (err: Error) => {
      toast.error(err?.message ?? '수정에 실패했습니다.')
    },
  })

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
                <InputProfileImage
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e)
                  }}
                />
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
                    // 입력 바뀌면 중복확인 다시 하도록 유도
                    setHasTriedDuplicateCheck(false)
                  }}
                  setIsNicknameDuplicated={setIsNicknameDuplicated}
                  setHasTriedDuplicateCheck={setHasTriedDuplicateCheck}
                />
              )}
            ></Controller>
          </section>
        </fieldset>
        <fieldset className="mt-auto flex w-full">
          <legend className="sr-only">제출</legend>
          <Button
            size="flex"
            type="submit"
            variant={isNicknameValid || isImageValid ? 'default' : 'disabled'}
          >
            수정하기
          </Button>
        </fieldset>
      </form>
      {showConfirmModal && (
        <ConfirmDialog
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
          description={`회원정보를\n 수정하시겠습니까?`}
          onConfirm={() => {
            if (!pendingData) return
            mutate(pendingData)
          }}
        />
      )}
    </Fragment>
  )
}

export default EditProfileForm
