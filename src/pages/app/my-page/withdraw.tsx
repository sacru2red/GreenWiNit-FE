import MyPageLayout from '@/pages/app/my-page/my-page-layout'
import WithDrawCaution from '@/components/withdraw-screen/withdraw-caution'
import WithDrawReasonForm from '@/components/withdraw-screen/withdraw-reason-form'
import WithDrawSubmitButton from '@/components/withdraw-screen/withdraw-submit-button'
import NoticeMessage from '@/components/withdraw-screen/notice-message'

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
