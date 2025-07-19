import BottomNavigation from '@/components/common/BottomNav'
import InformationCard from '@/components/Information-screen/InformationCard'
import InformationTab, { TabType } from '@/components/Information-screen/InformationTab'
import { useEffect, useState } from 'react'

export type InfoCard = {
  id: number
  infoCategoryName: string
  title: string
  thumbnailUrl: string
  content: string
}

const infoCardData: InfoCard[] = [
  {
    id: 1,
    infoCategoryName: '이벤트',
    title: '친환경적인 일상 실천하기',
    thumbnailUrl: '/img/2.png',
    content: '친환경 실천 방법에 대한 내용입니다.',
  },
  {
    id: 2,
    infoCategoryName: '이벤트',
    title: '제로웨이스트 워크숍',
    thumbnailUrl: '/img/2.png',
    content:
      '일상에서 쓰레기를 줄이는 방법을 배우는 워크숍입니다. 친환경 생필용품을 직접 만들어보고, 제로웨이스트 라이프 스타일을 함께 해봐요.',
  },
  {
    id: 3,
    infoCategoryName: '커뮤니티',
    title: '친환경 제품 만들기',
    thumbnailUrl: '/img/2.png',
    content: '버려지는 물건으로 새로운 가치를 만드는 업사이클링 DIY 클래스입니다.',
  },
  {
    id: 4,
    infoCategoryName: '커뮤니티',
    title: '제로 피크닉',
    thumbnailUrl: '/img/2.png',
    content: '일회용품 없이 즐기는 친환경 피크닉 모임입니다.',
  },
  {
    id: 5,
    infoCategoryName: '기타',
    title: '친환경 마켓',
    thumbnailUrl: '/img/2.png',
    content: '지속가능한 생활을 위한 친환경 제품들을 만나볼 수 있는 마켓입니다.',
  },
  {
    id: 6,
    infoCategoryName: '이벤트',
    title: '업사이클링 워크숍',
    thumbnailUrl: '/img/2.png',
    content: '버려지는 물건에 새 생명을 불어넣는 업사이클링 워크숍입니다.',
  },
]

function InformationShare() {
  const [activeTab, setActiveTab] = useState<TabType>('전체')
  const [filteredData, setFilteredData] = useState<InfoCard[]>([])

  const handleTabChange = (tabType: TabType) => {
    setActiveTab(tabType)
  }

  const filterData = (data: InfoCard[], tabType: TabType) => {
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
    setFilteredData(filterData(infoCardData, activeTab))
  }, [activeTab])

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
