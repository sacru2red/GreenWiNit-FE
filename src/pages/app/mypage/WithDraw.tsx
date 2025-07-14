import NoticeMessage from '@/components/withdraw-screen/NoticeMessage'
import WithDrawCaution from '@/components/withdraw-screen/WithDrawCaution'
import WithDrawReasonForm from '@/components/withdraw-screen/WithDrawReasonForm'
import WithDrawSubmitButton from '@/components/withdraw-screen/WithDrawSubmitButton'
import MyPageLayout from '@/pages/app/mypage/MyPageLayout'

function WithDraw() {
  return (
    <MyPageLayout title="회원 탈퇴">
      <NoticeMessage />
      <WithDrawReasonForm />
      <WithDrawCaution />
      <WithDrawSubmitButton />
    </MyPageLayout>
  )
}

export default WithDraw
