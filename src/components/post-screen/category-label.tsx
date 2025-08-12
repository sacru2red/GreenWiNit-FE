import { cn } from '@/lib/utils'

type CategoryLabelProps = {
  categoryName: string
}

const CategoryLabel = ({ categoryName }: CategoryLabelProps) => {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-sm px-2 text-sm md:text-base',
        categoryName === '이벤트' && 'bg-green-100 text-green-700',
        categoryName === '콘텐츠' && 'bg-yellow-100 text-yellow-500',
        categoryName === '기타' && 'bg-purple-100 text-purple-700',
      )}
    >
      {categoryName}
    </div>
  )
}

export default CategoryLabel
