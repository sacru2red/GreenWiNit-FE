import InputProfileImage from '@/components/common/input-profile-image'
import NicknameEditForm from '@/components/edit-profile-screen/nickname-form'
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
      <div className="mx-auto mt-[33px]">
        <InputProfileImage
          src={formState.profileImage}
          setSrc={(newSrc) => {
            setFormState({
              ...formState,
              profileImage: newSrc,
            })
          }}
        />
      </div>
      <NicknameEditForm />
    </MyPageLayout>
  )
}

export default EditProfile
