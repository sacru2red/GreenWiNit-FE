import { createFileRoute } from '@tanstack/react-router'
import { usersApi } from '@/api/users'
import AppTitle from '@/components/common/app-title'
import InputProfileImage from '@/components/common/input-profile-image'
import PageLayOut from '@/components/common/page-layout'
import InputNickname from '@/components/edit-profile-screen/nickname-checkt-input/input-nickname'
import { Button } from '@/components/common/button'
import { initHistoryAndLocation } from '@/lib/utils'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { authStore } from '@/store/auth-store'
import { showMessageIfExists } from '@/lib/error'

export const Route = createFileRoute('/signup')({
  component: Signup,
  validateSearch: (search: Record<string, unknown>) => {
    if (typeof search['tempToken'] === 'string') {
      return { tempToken: search['tempToken'] }
    }
    return { tempToken: undefined }
  },
})

function Signup() {
  // @TODO change to form state
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false)
  // @TODO change to form state
  const [hasTriedDuplicateCheck, setHasTriedDuplicateCheck] = useState(false)
  const search = Route.useSearch()
  const tempToken = search?.tempToken
  const setAccessToken = authStore((s) => s.setAccessToken)

  if (!tempToken) {
    throw new Error('Invalid tempToken')
  }

  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      profileImage: null,
      nickname: null,
    },
  })

  const onSubmit: SubmitHandler<FormState> = (data) => {
    if (!data.nickname) {
      toast.error('닉네임을 입력해주세요.')
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

    usersApi
      .signup({
        tempToken,
        nickname: data.nickname,
        profileImageUrl: data.profileImage,
      })
      .then((res) => {
        if (res.success && typeof res.result.accessToken === 'string') {
          setAccessToken(res.result.accessToken)
        } else {
          throw new Error(res.message)
        }
      })
      .then(() => {
        initHistoryAndLocation()
      })
      .catch((err) => {
        showMessageIfExists(err)
        console.error(err)
      })
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <AppTitle className="!text-3xl" />
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection>
          <form
            className="flex h-full w-full flex-col justify-center gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="profileImage"
              render={({ field }) => (
                <div className="self-center">
                  <InputProfileImage value={field.value} onChange={field.onChange} />
                </div>
              )}
            />
            <Controller
              control={control}
              name="nickname"
              rules={{ required: '닉네임을 입력해주세요.' }}
              render={({ field }) => (
                <InputNickname
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
            />
            <Button
              type="submit"
              className="mt-auto"
              variant={!hasTriedDuplicateCheck || isNicknameDuplicated ? 'disabled' : undefined}
            >
              제출
            </Button>
          </form>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
    </PageLayOut.Container>
  )
}

interface FormState {
  profileImage: string | null
  nickname: string | null
}

export default Signup
