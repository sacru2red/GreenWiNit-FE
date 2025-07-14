import LogoIcon from '@/components/common/LogoIcon'
import NickNameEditForm from '@/components/edit-profile-screen/NickNameEditForm'
import MyPageLayout from '@/pages/app/mypage/MyPageLayout'

function EditProfile() {
  return (
    <MyPageLayout title="회원정보수정" background="white">
      <div className="mt-[33px]">
        <LogoIcon size="large" />
      </div>
      <NickNameEditForm />
    </MyPageLayout>
  )
}

export default EditProfile
