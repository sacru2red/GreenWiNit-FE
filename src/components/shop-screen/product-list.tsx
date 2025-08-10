import useProducts from '@/hooks/use-products'
import { CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
  const navigate = useNavigate()

  const handleProductClick = (productId: number) => {
    navigate(`product/${productId}`)
  }

  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <p className="text-center">로딩 중...</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <CircleAlert size={32} color="gray" />
        <p>불러올 상품 정보가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2">
      {products?.map((product) => {
        return (
          <div
            key={product?.id}
            className="cursor-pointer rounded-[25px] p-4 text-left"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="mb-2 min-h-[140px] min-w-[140px] items-center justify-center rounded-[10px] bg-white p-5">
              <img
                className="items-center justify-center"
                src={product?.thumbnailUrl}
                alt={product?.name}
                width="160"
                height="160"
              />
            </div>
            <p className="text-sm text-black">{product?.name}</p>
            <p className="text-xs text-gray-500">{product?.sellingStatus}</p>
            <p className="text-lg text-green-600">{product?.price}p</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList
