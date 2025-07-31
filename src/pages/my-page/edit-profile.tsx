import EditProfileForm from '@/components/edit-profile-screen/edit-profile-form'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useState } from 'react'

interface FormState {
  profileImage: string | null
}

function EditProfile() {
  // @TODO migrate to react-hook-form
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formState, setFormState] = useState<FormState>({
    profileImage: null,
  })

  return (
    <MyPageLayout title="회원정보수정" background="white">
      <EditProfileForm />
    </MyPageLayout>
  )
}

export default EditProfile
