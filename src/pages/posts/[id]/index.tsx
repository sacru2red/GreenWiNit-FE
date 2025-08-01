import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import CategoryLabel from '@/components/post-screen/category-label'
import { usePost } from '@/hooks/post/usePost'

const PostDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams<{ postId: string }>()
  const parsedPostId = postId ? parseInt(postId) : undefined
  const { isLoading, data: post } = usePost(parsedPostId)

  if (isLoading) return <div>로딩 중...</div>

  if (!post) {
    return <div>데이터를 찾을 수 없습니다.</div>
  }

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex w-full flex-col bg-white">
      <header className="flex w-full flex-row justify-baseline gap-[140px] bg-white p-[16px] text-xl">
        <ChevronLeft size={24} className="cursor-pointer" onClick={handleBackButtonClick} />
        <p className="text-center font-bold text-black">활동 상세</p>
      </header>
      <div className="bg-green-50">
        <img src={post.thumbnailUrl} className="w-full" />
      </div>
      <div className="flex flex-row items-center justify-between p-[16px]">
        <div className="text-xl font-bold">{post.title}</div>
        <CategoryLabel categoryName={post.infoCategoryName} />
      </div>
      <div className="flex flex-col text-start">
        <p className="border-b-2 px-[16px] pt-[16px] text-xl font-bold text-black">소개</p>
        <p className="p-[16px] text-gray-500">{post.content}</p>
      </div>
    </div>
  )
}

export default PostDetail
