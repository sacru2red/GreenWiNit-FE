import DeliveryAddress from '@/components/shop-screen/DeliveryAddress'
import ProductDetailDescription from '@/components/shop-screen/ProductDetailDescription'
import ProductDetailFooter from '@/components/shop-screen/ProductDetailFooter'
import ProductDetailHeader from '@/components/shop-screen/ProductDetailHeader'
import useProduct from '@/hooks/useProduct'
import { useUserStatus } from '@/hooks/useUserStatus'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams<{ pointProductId: string }>()
  const navigate = useNavigate()

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const { data: product, isLoading: productLoading } = useProduct(params.pointProductId)
  const { data: userStatus, isLoading: userLoading } = useUserStatus()

  const isLoading = productLoading || userLoading
  const availablePoint = userStatus?.point ?? 0
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
          <DeliveryAddress />
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
