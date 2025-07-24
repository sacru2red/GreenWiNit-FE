import ProfileUploader from '@/components/common/ProfileUploader'
import NicknameEditForm from '@/components/edit-profile-screen/nickname-edit-form'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <div className="mx-auto mt-[33px]">
        <ProfileUploader />
      </div>
      <NicknameEditForm />
    </MyPageLayout>
  )
}

export default EditProfile
