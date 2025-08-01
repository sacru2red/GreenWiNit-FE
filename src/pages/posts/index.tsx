import BottomNavigation from '@/components/common/BottomNav'
import InformationCard from '@/components/Information-screen/InformationCard'
import InformationTab, { TabType } from '@/components/Information-screen/InformationTab'
import { useInformations } from '@/hooks/post/useInformations'
import { useState } from 'react'

/**
 * 실제 화면상에서 "정보공유"에 해당하는 페이지
 */
function Posts() {
  const { isLoading, data: infoData } = useInformations()

  const [activeTab, setActiveTab] = useState<TabType>('전체')

  const handleTabChange = (tabType: TabType) => {
    setActiveTab(tabType)
  }

  if (isLoading) {
    return <div>로딩 중....</div>
  }

  const filteredData =
    activeTab === '전체'
      ? infoData
      : infoData?.filter((item) => item.infoCategoryName === transfetabToCategoryName(activeTab))

  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr_auto]">
      <header>
        <div className="items-center justify-center bg-white p-[22px] text-xl font-bold">
          정보공유
        </div>
        <hr />
        <InformationTab onTabChange={handleTabChange} activeTab={activeTab} />
      </header>
      <div className="overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filteredData ? (
          filteredData.map((item) => (
            <InformationCard
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

const transfetabToCategoryName = (tabType: TabType) => {
  if (tabType === '참여형') {
    return '이벤트'
  }
  if (tabType === '커뮤니티') {
    return '커뮤니티'
  }

  return null
}

export default Posts
