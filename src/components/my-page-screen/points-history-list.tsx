import PointsHistoryItem from '@/components/my-page-screen/points-history-item'
import { PointTransaction } from '@/types/potints'

function PointsHistoryList({ list }: { list: PointTransaction[] }) {
  return (
    <ul className="flex h-full flex-col gap-4">
      {list.map((el) => (
        <PointsHistoryItem key={el.pointTransactionId} info={el} />
      ))}
    </ul>
  )
}

export default PointsHistoryList
