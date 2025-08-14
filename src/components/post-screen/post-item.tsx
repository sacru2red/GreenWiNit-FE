import { useNavigate } from 'react-router-dom'
import CategoryName from './category-name'

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
      className="flex h-full w-full cursor-pointer flex-row items-start justify-start overflow-clip rounded-lg border bg-white shadow-md"
      onClick={handleClickCard}
    >
      <div className="h-36 w-36">
        <img
          className="h-full w-full rounded-l-lg bg-green-50 object-cover"
          src={thumbnailUrl}
          alt="활동썸네일"
        />
      </div>
      <div className="flex h-full flex-1 flex-col px-2.5">
        <div className="flex flex-row items-center justify-between py-2">
          <p className="flex flex-1 truncate text-start text-base font-bold">
            {title.length > 8 ? title.substring(0, 8) : title}
          </p>
          <CategoryName category={categoryName} />
        </div>
        <p className="w-full truncate text-start text-base wrap-anywhere text-ellipsis whitespace-break-spaces text-gray-600">
          {content.length > 40 ? `${content.substring(0, 40)}...` : content}
        </p>
      </div>
    </div>
  )
}

export default PostItem
