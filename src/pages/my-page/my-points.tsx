import LogoAndName from '@/components/my-page-screen/logo-and-name'
import PointHistoryContainer from '@/components/my-page-screen/point-history-container'
import PointOverview from '@/components/my-page-screen/point-overview'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function MyPoints() {
  return (
    <MyPageLayout title="포인트 현황">
      <LogoAndName />
      <PointOverview />
      <PointHistoryContainer />
    </MyPageLayout>
  )
}

export default MyPoints
