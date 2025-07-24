import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type FilterType = '전체' | '교환내역' | '적립내역'

interface PointsHistoryFilterProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

function PointsHistoryFilter({ isOpen, setIsOpen }: PointsHistoryFilterProps) {
  const [isChecked, setIsChecked] = useState<FilterType>('전체')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="fixed top-auto bottom-0 left-1/2 min-h-[258px] min-w-[375px] translate-x-[-50%] translate-y-0 gap-0 rounded-t-xl rounded-b-none p-4 pb-6"
        showCloseButton={false} // 바텀시트에는 닫기 버튼 보통 안 씀
      >
        <div className="flex items-center text-start text-lg font-semibold">필터</div>
        <ul className="flex flex-col">
          {['전체', '교환내역', '적립내역'].map((label) => (
            <li key={label} className="flex items-center justify-between">
              <span
                className={cn(
                  'hover:text-light-gray flex-1 cursor-pointer py-4 text-start text-base',
                  isChecked === label && 'text-mountain_meadow',
                )}
                onClick={() => setIsChecked(label as FilterType)}
              >
                {label}
              </span>
              {isChecked === label && (
                <img src="/icons/check.svg" width={24} height={24} alt={`${label} 선택됨`} />
              )}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default PointsHistoryFilter
