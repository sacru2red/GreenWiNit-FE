import EditProfileForm from '@/components/edit-profile-screen/edit-profile-form'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page/edit-profile')({
  component: EditProfile,
})

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <EditProfileForm />
    </MyPageLayout>
  )
}

export default EditProfile
