import EditProfileForm from '@/components/edit-profile-screen/edit-profile-form'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useState } from 'react'

interface FormState {
  profileImage: string | null
}

function EditProfile() {
  // @TODO migrate to react-hook-form
  const [formState, setFormState] = useState<FormState>({
    profileImage: null,
  })

  return (
    <MyPageLayout title="회원정보수정" background="white">
      <EditProfileForm />
      /** @TODO remove it
      <div className="mx-auto mt-[33px]">
        <InputProfileImage
          value={formState.profileImage}
          onChange={(newSrc) => {
            setFormState({
              ...formState,
              profileImage: newSrc,
            })
          }}
        />
      </div>
      <NicknameEditForm />
    **/
    </MyPageLayout>
  )
}

export default EditProfile
