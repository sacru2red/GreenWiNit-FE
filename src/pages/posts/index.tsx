import BottomNavigation from '@/components/common/bottom-navigation'
import PostItem from '@/components/post-screen/post-item'
import CategoryTab from '@/components/post-screen/category-tab'
import { TabType } from '@/components/post-screen/category-tab/types'
import { usePostsArrayOnly } from '@/hooks/post/use-posts'
import { useState } from 'react'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { CircleAlert } from 'lucide-react'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import WarnNotLoggedIn from '@/components/home-screen/warn-not-logged-in'
import Loading from '@/components/common/loading'

/**
 * 실제 화면상에서 "정보공유"에 해당하는 페이지
 */
function Posts() {
  const isLoggedIn = useIsLoggedIn()
  const { isLoading, data: posts } = usePostsArrayOnly()
  const [activeTab, setActiveTab] = useState<TabType>('전체')
  const [isModalOpen, setIsModalOpen] = useState(true)

  const filteredPosts =
    activeTab === '전체' ? posts : posts?.filter((item) => item.infoCategoryName === activeTab)

  if (!isLoggedIn) {
    return (
      <WarnNotLoggedIn
        isOpen={isModalOpen}
        message={`로그인 후,\n정보공유를 확인할 수 있어요.`}
        infoMessageAfterRedirecting="정보공유를 확인하기위해 로그인 해주세요."
        onOpenChange={setIsModalOpen}
        backButtonAction="back"
      />
    )
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageTitle>정보공유</PageTitle>
      </PageLayOut.HeaderSection>
      <CategoryTab onTabChange={setActiveTab} activeTab={activeTab} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto p-4">
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
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <CircleAlert size={32} color="gray" />
              <div className="font-bold text-gray-400">공유된 포스트를 찾을 수 없어요.</div>
            </div>
          )}
        </div>
      )}
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default Posts
