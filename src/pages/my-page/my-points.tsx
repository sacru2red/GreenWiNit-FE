import LogoAndName from '@/components/my-page-screen/logo-and-name'
import PointHistoryContainer from '@/components/my-page-screen/point-history-container'
import PointOverview from '@/components/my-page-screen/point-overview'
import { useUserPoints } from '@/hooks/useUserPoints'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useUserStore } from '@/store/userStore'

function MyPoints() {
  const user = useUserStore((s) => s.user)

  const { data: getPointsReponse } = useUserPoints()

  if (!getPointsReponse) return <div>데이터 로딩중...</div>

  return (
    <MyPageLayout title="포인트 현황">
      <LogoAndName name={user?.name} />
      <PointOverview points={getPointsReponse?.result} />
      <PointHistoryContainer />
    </MyPageLayout>
  )
}

export default MyPoints
