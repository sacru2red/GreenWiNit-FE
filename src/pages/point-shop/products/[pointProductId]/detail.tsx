import DeliveryAddress from '@/components/shop-screen/delivery-address'
import ProductDetailDescription from '@/components/shop-screen/product-detail-description'
import ProductDetailFooter from '@/components/shop-screen/product-detail-footer'
import ProductDetailHeader from '@/components/shop-screen/product-detai-header'
import useProduct from '@/hooks/use-product'
import { useUserStatus } from '@/hooks/use-user-status'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams<{ pointProductId: string }>()
  const pointProductId = params.pointProductId
  const navigate = useNavigate()

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const { data: product, isLoading: productLoading } = useProduct(pointProductId)
  const { data: userStatus, isLoading: userLoading } = useUserStatus()

  const isLoading = productLoading || userLoading
  const availablePoint = userStatus?.result?.userTotalPoints ?? 0
  const deductPoint = isLoading ? 0 : selectedQuantity * (product?.price ?? 0)

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity)
  }

  const handleExchangePoint = () => {
    navigate('/buy')
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <div className="scrollbar-hide flex flex-col overflow-y-scroll">
        <div>
          <ProductDetailHeader
            imgUrl={product?.thumbnailUrl}
            name={product?.name}
            price={product?.price}
          />
        </div>
        <div>
          <ProductDetailDescription
            description={product?.description}
            price={product?.price}
            remainingQuantity={product?.stockQuantity}
            selectedQuantity={selectedQuantity}
            onQuantityChange={handleQuantityChange}
            availablePoint={availablePoint}
            isLoading={isLoading}
          />
        </div>
        <div>
          <DeliveryAddress pointProductId={pointProductId} />
        </div>
        <div>
          <ProductDetailFooter
            availablePoint={availablePoint}
            deductPoint={deductPoint}
            onExchange={handleExchangePoint}
          />
        </div>
      </div>
    </>
  )
}

export default ProductDetail
