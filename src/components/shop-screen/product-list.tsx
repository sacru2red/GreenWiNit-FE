import useProducts from '@/hooks/use-products'
import { CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Loading from '../common/loading'

const ProductList = () => {
  const navigate = useNavigate()

  const handleProductClick = (productId: number) => {
    navigate(`product/${productId}`)
  }

  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return <Loading />
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
    <div className="ml-4 grid grid-cols-2">
      {products?.map((product) => {
        return (
          <div
            key={product?.id}
            className="cursor-pointer items-center justify-center rounded-md p-2 text-start"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="mb-2 h-36 w-36 items-center justify-center rounded-md bg-white">
              <img
                className="h-full w-full items-center justify-center rounded-lg"
                src={product?.thumbnailUrl}
                alt={product?.name}
              />
            </div>
            <p className="text-md font-bold whitespace-nowrap text-black md:text-base">
              {product?.name}
            </p>
            <p className="md:text-md text-xs text-gray-500">{product?.sellingStatus}</p>
            <p className="text-lg font-bold text-green-600 md:text-xl">{product?.price}p</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList
