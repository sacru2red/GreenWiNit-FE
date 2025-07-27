import InputProfileImage from '@/components/common/InputProfileImage'
import NicknameEditForm from '@/components/edit-profile-screen/nickname-form'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <div className="mx-auto mt-[33px]">
        <InputProfileImage src={null} setSrc={() => {}} />
      </div>
      <NicknameEditForm />
    </MyPageLayout>
  )
}

export default EditProfile
