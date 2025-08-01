export type TabType = '전체' | '참여형' | '커뮤니티'

interface CategoryTabProps {
  onTabChange: (tabType: TabType) => void
  activeTab?: TabType
}

const CategoryTab = ({ onTabChange, activeTab }: CategoryTabProps) => {
  const handleTabClick = (tabType: TabType) => {
    onTabChange(tabType)
  }

  return (
    <div className="text-md flex flex-row items-center justify-center gap-[80px] bg-white px-[20px] text-center">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`flex-1 cursor-pointer p-[10px] py-[16px] text-center transition-colors hover:font-bold ${activeTab === tab ? 'font-bold text-green-600' : ''} `}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

const tabs: TabType[] = ['전체', '참여형', '커뮤니티']

export default CategoryTab
