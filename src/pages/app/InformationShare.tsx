import BottomNavigation from '@/components/common/BottomNav'
import InformationCard from '@/components/Information-screen/InformationCard'
import InformationTab, { TabType } from '@/components/Information-screen/InformationTab'
import { useInformations } from '@/hooks/useInformations'
import { useEffect, useState } from 'react'

export type InfoCard = {
  id: number
  infoCategoryName: string
  title: string
  thumbnailUrl: string
  content: string
}

function InformationShare() {
  const { isLoading, data: infoData } = useInformations()

  const [activeTab, setActiveTab] = useState<TabType>('전체')
  const [filteredData, setFilteredData] = useState<InfoCard[]>([])

  const handleTabChange = (tabType: TabType) => {
    setActiveTab(tabType)
  }

  const filterData = (data: InfoCard[] | undefined, tabType: TabType) => {
    if (!data) return []

    switch (tabType) {
      case '전체':
        return data
      case '참여형':
        return data.filter((item) => item.infoCategoryName === '이벤트')
      case '커뮤니티':
        return data.filter((item) => item.infoCategoryName === '커뮤니티')
    }
  }

  useEffect(() => {
    setFilteredData(filterData(infoData, activeTab))
  }, [activeTab, infoData])

  if (isLoading) return <div>로딩 중....</div>

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
        {filteredData.map((item) => (
          <InformationCard
            key={item.id}
            id={item.id}
            categoryName={item.infoCategoryName}
            title={item.title}
            content={item.content}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
      </div>

      <footer>
        <BottomNavigation />
      </footer>
    </div>
  )
}

export default InformationShare
