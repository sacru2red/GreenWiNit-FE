import { PointHistoryItem } from '@/components/my-page-screen/point-history-container'
import PointsHistoryItem from '@/components/my-page-screen/points-history-item'

function PointsHistoryList({ list }: { list: PointHistoryItem[] }) {
  return (
    <ul className="flex h-full flex-col gap-4">
      {list.map((el) => (
        <PointsHistoryItem key={el.pointTransactionId} info={el} />
      ))}
    </ul>
  )
}

export default PointsHistoryList
