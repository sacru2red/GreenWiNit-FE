import { useParams } from 'react-router-dom'
import CategoryLabel from '@/components/post-screen/category-label'
import { usePost } from '@/hooks/post/use-post'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import Loading from '@/components/common/loading'
import { CircleAlert } from 'lucide-react'

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>()
  const { isLoading, data } = usePost(postId)
  const post = data?.result

  if (isLoading) {
    return <Loading />
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center">
        <CircleAlert size={36} color="gray" />
        <p>등록된 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>활동 상세</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection padding="zero" className="m-0">
        <div className="w-full bg-green-50">
          <img src={post.imageurl} className="w-full" />
        </div>
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-xl font-bold">{post.title}</div>
          <CategoryLabel categoryName={post.infoCategoryName} />
        </div>
        <div className="flex flex-col text-start">
          <p className="border-b-2 px-4 pt-4 text-xl font-bold text-black">소개</p>
          <p className="p-4 wrap-anywhere whitespace-break-spaces text-gray-500">{post.content}</p>
        </div>
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

export default PostDetail
