import { cn } from '@/lib/utils'

type InformationLabelProps = {
  categoryName: string
}

const InformationLabel = ({ categoryName }: InformationLabelProps) => {
  return (
    <div
      className={cn(
        'flex-shrink-0 items-center justify-center rounded-[8px] px-[8px] py-[4px] text-sm',
        categoryName === '이벤트' && 'bg-green-100 text-green-700',
        categoryName === '커뮤니티' && 'bg-blue-100 text-blue-700',
        categoryName === '기타' && 'bg-purple-100 text-purple-700',
      )}
    >
      {categoryName}
    </div>
  )
}

export default InformationLabel
