import ProductDetailDescription from '@/components/shop-screen/ProductDetailDescription'
import ProductDetailHeader from '@/components/shop-screen/ProductDetailHeader'
import useProduct from '@/hooks/useProduct'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams<{ pointProductId: string }>()

  const { data: product, isLoading } = useProduct(params.pointProductId)

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <div className="flex flex-col">
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
          />
        </div>
      </div>
    </>
  )
}

export default ProductDetail
