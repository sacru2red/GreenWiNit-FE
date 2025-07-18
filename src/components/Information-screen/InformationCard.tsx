import { cn } from '@/lib/utils'

type InformationCardProps = {
  categoryName: string
  title: string
  content: string
  thumbnailUrl: string
}

const InformationCard = ({ categoryName, title, content, thumbnailUrl }: InformationCardProps) => {
  return (
    <div className="m-[16px] flex min-h-[150px] flex-row items-start justify-start overflow-hidden rounded-[25px] border bg-white shadow-md">
      <div className="h-[180px] w-[180px] flex-shrink-0">
        <img
          className="h-full rounded-l-[25px] bg-green-50 object-cover"
          src={thumbnailUrl}
          alt="활동이미지"
          width="180"
          height="180"
        />
      </div>
      <div className="flex flex-col justify-baseline p-[12px]">
        <div className="flex flex-row items-baseline justify-between gap-2 py-[10px]">
          <p className="text-md flex-1 truncate text-start font-bold">{title}</p>
          <div
            className={cn(
              'flex-shrink-0 items-center justify-center rounded-[8px] px-[8px] py-[2px] text-sm',
              categoryName === '이벤트' && 'bg-green-300 text-green-700',
              categoryName === '커뮤니티' && 'bg-blue-300 text-blue-700',
              categoryName === '기타' && 'bg-purple-300 text-purple-700',
            )}
          >
            {categoryName}
          </div>
        </div>
        <p className="items-start justify-baseline text-start">{content.substring(0, 30)}</p>
      </div>
    </div>
  )
}

export default InformationCard
