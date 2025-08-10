import { useNavigate } from 'react-router-dom'
import CategoryLabel from './category-label'

type PostItemProps = {
  id: string
  categoryName: string
  title: string
  content: string
  thumbnailUrl: string
}

const PostItem = ({ id, categoryName, title, content, thumbnailUrl }: PostItemProps) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    const cardData = { id, categoryName, title, content, thumbnailUrl }
    navigate(`/posts/${id}`, {
      state: { cardData },
    })
  }

  return (
    <div
      className="scrollbar-hide flex max-w-full cursor-pointer flex-row items-start justify-start overflow-y-auto rounded-3xl border bg-white shadow-md"
      onClick={handleClickCard}
    >
      <div className="h-36 w-36 flex-shrink-0 sm:h-42 sm:w-42">
        <img
          className="h-full w-full rounded-l-[25px] bg-green-50 object-cover"
          src={thumbnailUrl}
          alt="활동썸네일"
          width="180"
          height="180"
        />
      </div>
      <div className="flex flex-1 flex-col justify-baseline px-2 py-1">
        <div className="flex flex-row items-center justify-between py-2">
          <p className="text-md flex flex-1 text-start font-bold">{title}</p>
          <CategoryLabel categoryName={categoryName} />
        </div>
        <p className="items-start justify-baseline text-start">
          {content.length > 30 ? `${content.substring(0, 30)}...` : content}
        </p>
      </div>
    </div>
  )
}

export default PostItem
