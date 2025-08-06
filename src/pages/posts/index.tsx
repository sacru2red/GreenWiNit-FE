import BottomNavigation from '@/components/common/bottom-navigation'
import PostItem from '@/components/post-screen/post-item'
import CategoryTab from '@/components/post-screen/category-tab'
import { TabType } from '@/components/post-screen/category-tab/types'
import { usePostsArrayOnly } from '@/hooks/post/use-posts'
import { useState } from 'react'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'

/**
 * 실제 화면상에서 "정보공유"에 해당하는 페이지
 */
function Posts() {
  const { isLoading, data: posts } = usePostsArrayOnly()
  const [activeTab, setActiveTab] = useState<TabType>('전체')

  if (isLoading) {
    return <div>로딩 중....</div>
  }

  const filteredPosts =
    activeTab === '전체'
      ? posts
      : posts?.filter((item) => item.infoCategoryName === transferTabToCategoryName(activeTab))

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageTitle>정보공유</PageTitle>
      </PageHeaderSection>
      <CategoryTab onTabChange={setActiveTab} activeTab={activeTab} />
      <div className="overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredPosts ? (
          filteredPosts.map((item) => (
            <PostItem
              key={item.id}
              id={item.id}
              categoryName={item.infoCategoryName}
              title={item.title}
              content={item.content}
              thumbnailUrl={item.imageurl}
            />
          ))
        ) : (
          <div>데이터를 찾을 수 없습니다.</div>
        )}
      </div>
      <BottomNavigation containerClassName="mt-auto" />
    </PageContainer>
  )
}

const transferTabToCategoryName = (tabType: TabType) => {
  if (tabType === '참여형') {
    return '이벤트'
  }
  if (tabType === '커뮤니티') {
    return '커뮤니티'
  }

  return null
}

export default Posts
