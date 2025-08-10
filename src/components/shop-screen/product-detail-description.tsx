import ProductDetailLabel from './product-detail-label'

interface ProductDetailDescriptionProps {
  description: string | undefined
  price: number | undefined
  remainingQuantity: number | undefined
  selectedQuantity: number
  onQuantityChange: (quantity: number) => void
  availablePoint: number
  isLoading: boolean
}

const ProductDetailDescription = ({
  description,
  price,
  remainingQuantity,
  selectedQuantity,
  onQuantityChange,
  availablePoint,
  isLoading,
}: ProductDetailDescriptionProps) => {
  const availablePurchaseCount = Math.floor(availablePoint / (price ?? 1))
  const selectableCount = Math.min(availablePurchaseCount, remainingQuantity ?? 0)
  const finalCount = Math.min(selectableCount, 5)

  const deductPoint = isLoading ? 0 : selectedQuantity * (price ?? 0)
  const finalPoint = isLoading ? 0 : availablePoint - deductPoint

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div className="flex flex-col p-4 text-center">
      <p className="text-xl">제품 설명</p>
      <p className="p-4">{description}</p>
      <hr />
      <ProductDetailLabel
        label="사용 가능 포인트"
        point={availablePoint}
        valueClassName="text-green-500"
      />
      <ProductDetailLabel
        label="수량 선택"
        point={availablePoint}
        valueClassName="text-green-500"
        isButton={true}
        remainingQuantity={finalCount}
        onQuantityChange={onQuantityChange}
        selectedQuantity={selectedQuantity}
      />
      <ProductDetailLabel label="차감 포인트" point={deductPoint} valueClassName="text-red-500" />
      <ProductDetailLabel label="총 보유 포인트" point={finalPoint} />
      <hr />
    </div>
  )
}

export default ProductDetailDescription
