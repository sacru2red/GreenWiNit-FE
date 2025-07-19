import { useNavigate } from 'react-router-dom'
import InformationLabel from './InformationLabel'

type InformationCardProps = {
  id: number
  categoryName: string
  title: string
  content: string
  thumbnailUrl: string
}

const InformationCard = ({
  id,
  categoryName,
  title,
  content,
  thumbnailUrl,
}: InformationCardProps) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    const cardData = { id, categoryName, title, content, thumbnailUrl }
    navigate(`/information-share/${id}`, {
      state: { cardData },
    })
  }

  return (
    <div
      className="m-[16px] flex min-h-[150px] cursor-pointer flex-row items-start justify-start overflow-hidden rounded-[25px] border bg-white shadow-md"
      onClick={handleClickCard}
    >
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
        <div className="flex flex-row items-center justify-between gap-2 py-[10px]">
          <p className="text-md flex-1 truncate text-start font-bold">{title}</p>
          <InformationLabel categoryName={categoryName} />
        </div>
        <p className="items-start justify-baseline text-start">{content.substring(0, 30)}</p>
      </div>
    </div>
  )
}

export default InformationCard
