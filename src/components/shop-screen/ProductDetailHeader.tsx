import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ProductDetailHeaderProps {
  productImgUrl: string | undefined
  productName: string | undefined
  productValue: number | undefined
}

const ProductDetailHeader = ({
  productImgUrl,
  productName,
  productValue,
}: ProductDetailHeaderProps) => {
  const navigate = useNavigate()

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  return (
    <div className="relative w-full bg-white">
      <div className="absolute top-5 left-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-colors hover:bg-gray-400">
        <ChevronLeft size={20} className="text-gray-700" onClick={handleBackButtonClick} />
      </div>

      <div className="flex h-[300px] w-full justify-center bg-gray-100 p-[2px]">
        <img src={productImgUrl} alt="Product" />
      </div>
      <div className="px-[16px] py-[8px] text-left font-bold">
        <p className="text-xl text-black">{productName}</p>
        <p className="text-2xl text-green-500">{productValue} 포인트</p>
      </div>
      <hr />
    </div>
  )
}

export default ProductDetailHeader
