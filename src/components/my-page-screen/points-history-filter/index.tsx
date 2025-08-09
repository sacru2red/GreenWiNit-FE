import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PointFilterType } from '@/types/points'
import { useQueryClient } from '@tanstack/react-query'
import { PointsHistoryFilterProps } from './types'
import { usersQueryKeys } from '@/api/users'

type FilterElement = (typeof FILTER_OPTIONS)[number]
function PointsHistoryFilter({ isOpen, setIsOpen, setFilterType }: PointsHistoryFilterProps) {
  const [isChecked, setIsChecked] = useState<FilterElement>('전체')
  const queryClient = useQueryClient()

  const handleFilterChange = async (label: FilterElement) => {
    const statusMap: Record<FilterElement, PointFilterType | null> = {
      전체: null,
      적립내역: 'earn',
      교환내역: 'spend',
    }

    const currentType = statusMap[isChecked]
    const slectedType = statusMap[label]

    queryClient.invalidateQueries({
      queryKey: usersQueryKeys['me/point-history'].detail(currentType).queryKey,
    })
    setFilterType(slectedType)
    setIsChecked(label)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="fixed top-auto bottom-0 left-1/2 min-h-[258px] min-w-[375px] translate-x-[-50%] translate-y-0 gap-0 rounded-t-xl rounded-b-none p-4 pb-6"
        showCloseButton={false} // 바텀시트에는 닫기 버튼 보통 안 씀
      >
        <div className="flex items-center text-start text-lg font-semibold">필터</div>
        <ul className="flex flex-col">
          {FILTER_OPTIONS.map((label) => (
            <li key={label} className="flex items-center justify-between">
              <span
                className={cn(
                  'hover:text-light-gray flex-1 cursor-pointer py-4 text-start text-base',
                  isChecked === label && 'text-mountain_meadow',
                )}
                onClick={() => handleFilterChange(label)}
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
const FILTER_OPTIONS = ['전체', '적립내역', '교환내역'] as const

export default PointsHistoryFilter
