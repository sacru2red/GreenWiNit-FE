import { usersApi } from '@/api/users'
import AppTitle from '@/components/common/AppTitle'
import InputProfileImage from '@/components/common/input-profile-image'
import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import InputNickname from '@/components/edit-profile-screen/nickname-form/input-nickname'
import { Button } from '@/components/ui/button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

interface FormState {
  profileImage: string | null
  nickname: string | null
}
const Signup = () => {
  const [searchParams] = useSearchParams()
  const tempToken = searchParams.get('tempToken')

  if (!tempToken) {
    throw new Error('Invalid tempToken')
  }

  const { control, register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      profileImage: null,
      nickname: null,
    },
  })

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data)
    if (!data.nickname || !data.profileImage) {
      console.warn('nickname or profileImage is null')
      return
    }

    usersApi
      .signup({
        tempToken,
        nickname: data.nickname,
        profileImageUrl: data.profileImage,
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <AppTitle className="!text-3xl" />
      </PageHeaderSection>
      <form
        className="flex h-full w-full flex-col justify-center gap-8 p-4 pt-8"
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
        <InputNickname {...register('nickname', { required: true })} mode="new" />
        <Button type="submit" className="mt-auto">
          제출
        </Button>
      </form>
    </PageContainer>
  )
}

export default Signup
