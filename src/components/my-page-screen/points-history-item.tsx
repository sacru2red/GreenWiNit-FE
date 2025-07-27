import { PointHistoryItem } from '@/components/my-page-screen/point-history-container'
import { cn, formatIsoToDateString } from '@/lib/utils'

function PointsHistoryItem({ info }: { info: PointHistoryItem }) {
  const formattedAmount = info.status === 'EARN' ? '+' + info.amount : '-' + info.amount
  const formattedCreatedDate = formatIsoToDateString(info.transactionAt)

  return (
    <div className="flex h-20 w-full items-center rounded-[12px] bg-white p-4 shadow-lg">
      <div className="flex-1 flex-col gap-1 text-start">
        <h3 className="text-xm text-secondary-foreground">{info.description}</h3>
        <span className="text-lighter-gray text-xs">{formattedCreatedDate}</span>
      </div>
      <div
        className={cn(
          'text-lg font-bold',
          info.status === 'EARN' ? 'text-mountain_meadow' : 'text-[#FA4D56]',
        )}
      >
        {formattedAmount}
      </div>
    </div>
  )
}

export default PointsHistoryItem
