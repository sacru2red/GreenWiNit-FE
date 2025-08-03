import LogoAndName from '@/components/my-page-screen/logo-and-name'
import PointHistoryContainer from '@/components/my-page-screen/point-history-container'
import PointOverview from '@/components/my-page-screen/point-overview'
import { useUserPoints } from '@/hooks/use-user-points'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { userStore } from '@/store/user-store'

function MyPoints() {
  const user = userStore((s) => s.user)
  const { data: getPointsReponse } = useUserPoints()
  const points = getPointsReponse?.result

  if (!points) return <div>데이터 로딩중...</div>

  return (
    <MyPageLayout title="포인트 현황">
      <LogoAndName name={user?.name ?? '이름없음'} />
      <PointOverview points={points} />
      <PointHistoryContainer />
    </MyPageLayout>
  )
}

export default MyPoints
