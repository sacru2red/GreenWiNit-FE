import BottomNavigation from '@/components/common/BottomNav'
import PostItem from '@/components/post-screen/post-item'
import CategoryTab from '@/components/post-screen/category-tab'
import { TabType } from '@/components/post-screen/category-tab/types'
import { usePosts } from '@/hooks/post/usePosts'
import { useState } from 'react'

/**
 * 실제 화면상에서 "정보공유"에 해당하는 페이지
 */
function Posts() {
  const { isLoading, data: posts } = usePosts()
  const [activeTab, setActiveTab] = useState<TabType>('전체')

  if (isLoading) {
    return <div>로딩 중....</div>
  }

  const filteredPosts =
    activeTab === '전체'
      ? posts
      : posts?.filter((item) => item.infoCategoryName === transferTabToCategoryName(activeTab))

  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr_auto]">
      <header>
        <div className="items-center justify-center bg-white p-[22px] text-xl font-bold">
          정보공유
        </div>
        <hr />
        <CategoryTab onTabChange={setActiveTab} activeTab={activeTab} />
      </header>
      <div className="overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredPosts ? (
          filteredPosts.map((item) => (
            <PostItem
              key={item.id}
              id={item.id}
              categoryName={item.infoCategoryName}
              title={item.title}
              content={item.content}
              thumbnailUrl={item.thumbnailUrl}
            />
          ))
        ) : (
          <div>데이터를 찾을 수 없습니다.</div>
        )}
      </div>
      <footer>
        <BottomNavigation />
      </footer>
    </div>
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
