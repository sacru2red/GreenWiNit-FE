import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import InformationLabel from '@/components/Information-screen/InformationLabel'
import { useInformation } from '@/hooks/useInformation'

const InformationDetail = () => {
  const navigate = useNavigate()
  const { informationId } = useParams<{ informationId: string }>()
  const numericId = informationId ? parseInt(informationId) : undefined
  const { isLoading, data: cardData } = useInformation(numericId)

  if (isLoading) return <div>로딩 중...</div>

  if (!cardData) {
    return <div>데이터를 찾을 수 없습니다.</div>
  }

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex w-full flex-col bg-white">
      <header className="flex w-full flex-row justify-baseline gap-[140px] bg-white p-[16px] text-xl">
        <ChevronLeft size={24} className="cursor-pointer" onClick={handleBackButtonClick} />
        <p className="text-center font-bold text-black">활동 상세</p>
      </header>
      <div className="bg-green-50">
        <img src={cardData.thumbnailUrl} className="w-full" />
      </div>
      <div className="flex flex-row items-center justify-between p-[16px]">
        <div className="text-xl font-bold">{cardData.title}</div>
        <InformationLabel categoryName={cardData.infoCategoryName} />
      </div>
      <div className="flex flex-col text-start">
        <p className="border-b-2 px-[16px] pt-[16px] text-xl font-bold text-black">소개</p>
        <p className="p-[16px] text-gray-500">{cardData.content}</p>
      </div>
    </div>
  )
}

export default InformationDetail
