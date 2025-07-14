import LogoAndName from '@/components/my-page-screen/LogoAndName'
import PointHistoryContainer from '@/components/my-page-screen/PointHistoryContainer'
import PointOverview from '@/components/my-page-screen/PointOverview'
import MyPageLayout from '@/pages/app/mypage/MyPageLayout'

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
