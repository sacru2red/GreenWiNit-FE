import BottomNavigation from '@/components/common/bottom-navigation'
import PostItem from '@/components/post-screen/post-item'
import CategoryTab from '@/components/post-screen/category-tab'
import { TabType } from '@/components/post-screen/category-tab/types'
import { usePostsArrayOnly } from '@/hooks/post/use-posts'
import { useState } from 'react'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import { CircleAlert } from 'lucide-react'
import useUserInfo from '@/hooks/use-user-info'
import LoginDialog from '@/components/common/modal/login-dialog'
import { useNavigate } from 'react-router-dom'

/**
 * 실제 화면상에서 "정보공유"에 해당하는 페이지
 */
function Posts() {
  const navigate = useNavigate()
  const { data: user } = useUserInfo()
  const { isLoading, data: posts } = usePostsArrayOnly()
  const [activeTab, setActiveTab] = useState<TabType>('전체')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const handleNavigateLogin = () => {
    navigate('/login')
  }

  const filteredPosts =
    activeTab === '전체' ? posts : posts?.filter((item) => item.infoCategoryName === activeTab)

  if (user === undefined || user === null) {
    return (
      <LoginDialog
        isOpen={isModalOpen}
        description="로그인 후,"
        paragraph="정보공유를 확인할 수 있어요"
        setIsOpen={setIsModalOpen}
        onLogin={handleNavigateLogin}
      />
    )
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageTitle>정보공유</PageTitle>
      </PageHeaderSection>
      <CategoryTab onTabChange={setActiveTab} activeTab={activeTab} />
      {isLoading ? (
        <div className="flex items-center justify-center">포스트를 찾는 중....</div>
      ) : (
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
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <CircleAlert size={32} color="gray" />
              <div className="font-bold text-gray-400">공유된 포스트를 찾을 수 없어요.</div>
            </div>
          )}
        </div>
      )}
      <BottomNavigation containerClassName="mt-auto" />
    </PageContainer>
  )
}

export default Posts
