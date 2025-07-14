import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import NoticeMessage from '@/components/withdraw-screen/NoticeMessage'
import WithDrawCaution from '@/components/withdraw-screen/WithDrawCaution'
import WithDrawReasonForm from '@/components/withdraw-screen/WithDrawReasonForm'
import WithDrawSubmitButton from '@/components/withdraw-screen/WithDrawSubmitButton'

function WithDraw() {
  return (
    <PageContainer className="overflow-scroll bg-white">
      <PageHeaderSection className="py-5">
        <PageHeaderSection.BackIcon />
        <PageTitle>회원 탈퇴</PageTitle>
      </PageHeaderSection>
      <NoticeMessage />
      <WithDrawReasonForm />
      <WithDrawCaution />
      <WithDrawSubmitButton />
    </PageContainer>
  )
}

export default WithDraw
