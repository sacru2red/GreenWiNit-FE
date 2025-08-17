import { createFileRoute } from '@tanstack/react-router'
import { usersApi } from '@/api/users'
import AppTitle from '@/components/common/app-title'
import InputProfileImage from '@/components/common/input-profile-image'
import PageLayOut from '@/components/common/page-layout'
import InputNickname from '@/components/edit-profile-screen/nickname-checkt-input/input-nickname'
import { Button } from '@/components/ui/button'
import { initHistoryAndLocation } from '@/lib/utils'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false)
  const search = Route.useSearch()
  const tempToken = search?.tempToken

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

    if (!isNicknameDuplicated) {
      toast.error('닉네임 중복확인을 해주세요')
      return
    }

    usersApi
      .signup({
        tempToken,
        nickname: data.nickname,
        profileImageUrl: data.profileImage ?? 'https://www.greenwinit.store/img/logo-icon.png',
      })
      .then(() => {
        initHistoryAndLocation()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <PageLayOut.Container>
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
                  setIsNicknameDuplicated(false) // 입력 바뀌면 중복확인 다시 하도록 유도
                }}
                setIsNicknameDuplicated={setIsNicknameDuplicated}
              />
            )}
          ></Controller>
          <Button
            type="submit"
            className="mt-auto"
            variant={isNicknameDuplicated ? 'default' : 'disabled'}
          >
            제출
          </Button>
        </form>
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

interface FormState {
  profileImage: string | null
  nickname: string | null
}

export default Signup
