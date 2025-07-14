import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import LogoAndName from '@/components/mypage-screen/LogoAndName'
import PointHistoryContainer from '@/components/mypage-screen/PointHistoryContainer'
import PointOverview from '@/components/mypage-screen/PointOverview'

function MyPoints() {
  return (
    <PageContainer className="overflow-scroll">
      <PageHeaderSection className="py-5">
        <PageHeaderSection.BackIcon />
        <PageTitle>포인트 현황</PageTitle>
      </PageHeaderSection>
      <LogoAndName />
      <PointOverview />
      <PointHistoryContainer />
    </PageContainer>
  )
}

export default MyPoints
