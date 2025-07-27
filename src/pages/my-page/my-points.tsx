import LogoAndName from '@/components/my-page-screen/logo-and-name'
import PointHistoryContainer from '@/components/my-page-screen/point-history-container'
import PointOverview from '@/components/my-page-screen/point-overview'
import { useUserPointHistory } from '@/hooks/useUserPointHistory'
import { useUserPoints } from '@/hooks/useUserPoints'
import MyPageLayout from '@/pages/my-page/my-page-layout'
import { useUserStore } from '@/store/userStore'
import { useState } from 'react'

export type FilterType = 'all' | 'earn' | 'spend'

function MyPoints() {
  const [type, setType] = useState<FilterType>('all')
  const user = useUserStore((s) => s.user)

  const { data: getPointsReponse } = useUserPoints()
  const { data: getPointHistoryReponse } = useUserPointHistory(type)

  const points = getPointsReponse?.result ?? {
    currentBalance: 0,
    totalEarned: 0,
    totalSpent: 0,
  }
  const list = getPointHistoryReponse?.result.content ?? []

  return (
    <MyPageLayout title="포인트 현황">
      <LogoAndName name={user?.name ?? '이름없음'} />
      <PointOverview points={points} />
      <PointHistoryContainer list={list} setType={setType} />
    </MyPageLayout>
  )
}

export default MyPoints
