import useProducts from '@/hooks/useProducts'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
  const navigate = useNavigate()

  const handleProductClick = (productId: number) => {
    navigate(`product/${productId}`)
  }

  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  console.log(products)

  return (
    <div className="px-[17px] py-[26px]">
      <div className="grid grid-cols-2">
        {products?.map((product, index) => {
          return (
            <div
              key={`${product?.id}-${index}`}
              className="cursor-pointer rounded-[25px] p-[16px] text-left"
              onClick={() => handleProductClick(product?.pointProductId)}
            >
              <div className="mb-[8px] min-h-[140px] min-w-[140px] items-center justify-center rounded-[10px] bg-white p-[20px]">
                <img
                  className="items-center justify-center"
                  src={product?.thumbnailUrl}
                  alt={product?.pointProductName}
                  width="160"
                  height="160"
                />
              </div>
              <p className="text-sm text-black">{product?.pointProductName}</p>
              <p className="text-xs text-gray-500">{product?.sellingStatus}</p>
              <p className="text-lg text-green-600">{product?.pointPrice}p</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList
