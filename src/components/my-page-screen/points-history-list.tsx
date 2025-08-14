import PointsHistoryItem from '@/components/my-page-screen/points-history-item'
import { PointHistory } from '@/types/points'

function PointsHistoryList({ list }: { list: PointHistory[] }) {
  return (
    <ul className="flex flex-col gap-4 px-4">
      {list.map((el) => (
        <PointsHistoryItem key={el.pointTransactionId} info={el} />
      ))}
    </ul>
  )
}

export default PointsHistoryList
