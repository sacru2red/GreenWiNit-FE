import { useParams } from 'react-router-dom'
import CategoryLabel from '@/components/post-screen/category-label'
import { usePost } from '@/hooks/post/use-post'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>()
  const { isLoading, data } = usePost(postId)
  const post = data?.result

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex justify-center">
        <p>데이터를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>활동 상세</PageTitle>
      </PageHeaderSection>
      <div className="w-full bg-green-50">
        <img src={post.imageurl} className="w-full" />
      </div>
      <div className="flex flex-row items-center justify-between p-4">
        <div className="text-xl font-bold">{post.title}</div>
        <CategoryLabel categoryName={post.infoCategoryName} />
      </div>
      <div className="flex flex-col text-start">
        <p className="border-b-2 px-4 pt-4 text-xl font-bold text-black">소개</p>
        <p className="p-4 text-gray-500">{post.content}</p>
      </div>
    </PageContainer>
  )
}

export default PostDetail
