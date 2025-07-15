import MyPageLayout from '@/pages/app/my-page/my-page-layout'
import ProfileUploader from '@/components/common/ProfileUploader'
import NicknameEditForm from '@/components/edit-profile-screen/nickname-edit-form'

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
