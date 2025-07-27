import PointsFilterButton from '@/components/my-page-screen/points-filter-button'
import PointsHistoryList from '@/components/my-page-screen/points-history-list'
import { FilterType } from '@/pages/my-page/my-points'
import { Dispatch, SetStateAction } from 'react'

export type PointHistoryItem = {
  pointTransactionId: string
  description: string
  amount: number
  status: 'EARN' | 'SPEND'
  transactionAt: string // ISO 문자열
}
interface PointHistoryContainerProps {
  list: PointHistoryItem[]
  setType: Dispatch<SetStateAction<FilterType>>
}

function PointHistoryContainer({ list, setType }: PointHistoryContainerProps) {
  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">포인트 내역</h2>
        <PointsFilterButton setType={setType} />
      </div>
      <PointsHistoryList list={list} />
    </section>
  )
}

export default PointHistoryContainer
