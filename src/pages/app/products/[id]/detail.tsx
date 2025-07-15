import ProductDetailDescription from '@/components/shop-screen/ProductDetailDescription'
import ProductDetailHeader from '@/components/shop-screen/ProductDetailHeader'
import useProduct from '@/hooks/useProduct'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams<{ pointProductId: string }>()

  const { data: product, isLoading } = useProduct(params.pointProductId)

  console.log(product === undefined ? '개발 오류' : product)

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <div className="flex flex-col">
        <div>
          <ProductDetailHeader
            productImgUrl={product?.thumbnailUrl}
            productName={product?.pointProductName}
            productValue={product?.pointPrice}
          />
        </div>
        <div>
          <ProductDetailDescription
            description={product?.description}
            productValue={product?.pointPrice}
            remainingQuantity={product?.stockQuantity}
          />
        </div>
      </div>
    </>
  )
}

export default ProductDetail
