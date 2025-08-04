import EditProfileForm from '@/components/edit-profile-screen/edit-profile-form'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <EditProfileForm />
    </MyPageLayout>
  )
}

export default EditProfile
