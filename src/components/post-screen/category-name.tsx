import { cn } from '@/lib/utils'

type CategoryNameProps = {
  category: string
}

const CategoryName = ({ category }: CategoryNameProps) => {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-sm px-2 text-sm md:text-base',
        category === '이벤트' && 'bg-green-100 text-green-700',
        category === '콘텐츠' && 'bg-yellow-100 text-yellow-500',
        category === '기타' && 'bg-purple-100 text-purple-700',
      )}
    >
      {category}
    </div>
  )
}

export default CategoryName
