import DeliveryAddress from '@/components/shop-screen/delivery-address'
import PointDescription from '@/components/shop-screen/point-description'
import ExchangeProduct from '@/components/shop-screen/exchange-product'
import PageLayOut from '@/components/common/page-layout'
import useProduct from '@/hooks/product/use-product'
import { useUserStatus } from '@/hooks/use-user-status'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/common/loading'

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
    return <Loading />
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection padding="zero" className="m-0">
        <div className="relative w-full">
          <div className="flex h-75 w-full justify-center bg-gray-100 p-4">
            <img src={product?.thumbnailUrl} alt="Product" />
          </div>
          <div className="px-4 py-2 text-left font-bold">
            <p className="text-xl text-black">{product?.name}</p>
            <p className="text-2xl text-[#0FBA7E]">{product?.price} 포인트</p>
          </div>
          <hr />
        </div>
        <PointDescription
          description={product?.description}
          price={product?.price}
          remainingQuantity={product?.stockQuantity}
          selectedQuantity={selectedQuantity}
          onQuantityChange={handleQuantityChange}
          availablePoint={availablePoint}
          isLoading={isLoading}
        />
        <DeliveryAddress pointProductId={pointProductId} />
        <ExchangeProduct
          availablePoint={availablePoint}
          deductPoint={deductPoint}
          onExchange={handleExchangePoint}
        />
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}

export default ProductDetail
