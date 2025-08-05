import EmptyPointHistory from '@/components/my-page-screen/empty-point-history'
import PointsFilterButton from '@/components/my-page-screen/points-filter-button'
import PointsHistoryList from '@/components/my-page-screen/points-history-list'
import { useUserPointHistory } from '@/hooks/use-user-point-history'
import { PointFilterType } from '@/types/points'
import { useState } from 'react'

function PointHistoryContainer() {
  const [filterType, setFilterType] = useState<PointFilterType | null>(null)
  const { data: getPointHistoryReponse } = useUserPointHistory(filterType)

  const list = getPointHistoryReponse?.result?.content ?? []

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">포인트 내역</h2>
        <PointsFilterButton setFilterType={setFilterType} />
      </div>
      {list ? (
        <PointsHistoryList list={list} />
      ) : (
        <div className="mt-5">
          <EmptyPointHistory />
        </div>
      )}
    </section>
  )
}

export default PointHistoryContainer
