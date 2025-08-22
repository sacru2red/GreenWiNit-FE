import ProfileAndName from '@/components/my-page-screen/logo-and-name'
import PointHistoryContainer from '@/components/my-page-screen/point-history-container'
import PointOverview from '@/components/my-page-screen/point-overview'
import useUserName from '@/hooks/use-user-name'
import { useUserPoints } from '@/hooks/use-user-points'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { createFileRoute } from '@tanstack/react-router'
import Loading from '@/components/common/loading'

export const Route = createFileRoute('/my-page/my-points')({
  component: MyPoints,
})

function MyPoints() {
  const userName = useUserName()
  const { data: getPointsReponse } = useUserPoints()
  const points = getPointsReponse?.result

  if (!points) return <Loading />

  return (
    <MyPageLayout title="포인트 현황" background="green" className="p-0">
      <ProfileAndName name={userName ?? '이름없음'} />
      <PointOverview points={points} />
      <PointHistoryContainer />
    </MyPageLayout>
  )
}

export default MyPoints
