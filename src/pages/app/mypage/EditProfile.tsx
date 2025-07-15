import ProfileUploader from '@/components/common/ProfileUploader'
import NicknameEditForm from '@/components/edit-profile-screen/NicknameEditForm'
import MyPageLayout from '@/pages/app/mypage/MyPageLayout'

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <div className="mt-[33px]">
        <ProfileUploader />
      </div>
      <NicknameEditForm />
    </MyPageLayout>
  )
}

export default EditProfile
