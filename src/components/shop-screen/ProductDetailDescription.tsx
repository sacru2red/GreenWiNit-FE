import { useUserStatus } from '@/hooks/useUserStatus'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ProductDetailLabel from './ProductDetailLabel'

interface ProductDetailProps {
  description: string
  productValue: number
  remainingQuantity: number
}

const ProductDetailDescription = ({
  description,
  productValue,
  remainingQuantity,
}: ProductDetailProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const { data: userStatus, isLoading } = useUserStatus()
  const navigate = useNavigate()

  const totalValue = productValue * selectedQuantity

  const handleExcnagePoint = () => {
    navigate('/buy')
  }

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity)
  }

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div className="flex flex-col p-[16px] text-center">
      <p className="text-xl">제품 설명</p>
      <p className="p-[16px]">{description}</p>
      <hr />
      <ProductDetailLabel
        label="사용 가능 포인트"
        labelValue={userStatus?.point}
        valueClassName="text-green-500"
      />
      <ProductDetailLabel
        label="수량 선택"
        labelValue={userStatus?.point}
        valueClassName="text-green-500"
        isButton={true}
        remainingQuantity={remainingQuantity}
        onQuantityChange={handleQuantityChange}
        selectedQuantity={selectedQuantity}
      />
      <ProductDetailLabel
        label="차감 포인트"
        labelValue={totalValue}
        valueClassName="text-red-500"
      />
      <ProductDetailLabel
        label="총 보유 포인트"
        labelValue={(userStatus?.point ?? 0) - productValue * selectedQuantity}
      />
      <hr />
      <p className="px-[10px] pt-[20px] text-sm">
        * 본 리워드는 봉사형 프로젝트 굿즈로 환불 및 교환이 불가능합니다. 제품 불량 및 파손 시에는
        [1:1문의]를 통해 연락주세요.
      </p>
      <button
        onClick={handleExcnagePoint}
        className="m-[20px] rounded-[10px] bg-green-500 px-[10px] py-[14px] font-bold text-white"
      >
        포인트 교환하기
      </button>
    </div>
  )
}

export default ProductDetailDescription
