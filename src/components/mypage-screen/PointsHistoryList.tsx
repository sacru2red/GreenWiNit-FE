import PointsHistoryItem from '@/components/mypage-screen/PointsHistoryItem'
import { PointTransaction } from '@/types/potints'

function PointsHistoryList({ list }: { list: PointTransaction[] }) {
  return (
    <ul className="flex h-full flex-col gap-4">
      {list.map((el) => (
        <PointsHistoryItem info={el} />
      ))}
    </ul>
  )
}

export default PointsHistoryList
