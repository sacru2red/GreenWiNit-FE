import { cn } from '@/lib/utils'
import { TabType } from './types'

interface CategoryTabProps {
  onTabChange: (tabType: TabType) => void
  activeTab?: TabType
}

const CategoryTab = ({ onTabChange, activeTab }: CategoryTabProps) => {
  const handleTabClick = (tabType: TabType) => {
    onTabChange(tabType)
  }

  return (
    <div className="text-md flex flex-row items-center justify-center gap-2 bg-white px-[20px] text-center whitespace-nowrap">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={cn(
            'flex-1 cursor-pointer p-[10px] py-[16px] text-center transition-colors hover:font-bold',
            activeTab === tab && 'font-bold text-green-600',
          )}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

const tabs: TabType[] = ['전체', '이벤트', '콘텐츠', '기타']

export default CategoryTab
