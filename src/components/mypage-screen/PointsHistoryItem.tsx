import { formatIsoToDateString } from '@/lib/utils'
import { PointTransaction } from '@/types/potints'

function PointsHistoryItem({ info }: { info: PointTransaction }) {
  const formattedAmount = info.status === 'EARN' ? '+' + info.amount : '-' + info.amount
  const formattedCreatedDate = formatIsoToDateString(info.transactionAt)

  return (
    <div className="flex h-[80px] w-full items-center rounded-[12px] bg-white p-4 shadow-lg">
      <div className="flex-1 flex-col gap-1 text-start">
        <h3 className="text-xm text-secondary-foreground">{info.description}</h3>
        <span className="text-lighter-gray text-xs">{formattedCreatedDate}</span>
      </div>
      <div className="text-mountain_meadow text-lg font-bold">{formattedAmount}</div>
    </div>
  )
}

export default PointsHistoryItem
