import { cn } from '@/lib/utils'

interface ProductDetailFooterProps {
  availablePoint: number
  deductPoint: number
  onExchange: () => void
}

const ProductDetailFooter = ({
  availablePoint,
  deductPoint,
  onExchange,
}: ProductDetailFooterProps) => {
  const isDisabled = availablePoint < deductPoint

  return (
    <div className="w-full">
      <p className="px-[10px] pt-[20px] text-sm">
        * 본 리워드는 봉사형 프로젝트 굿즈로 환불 및 교환이 불가능합니다. 제품 불량 및 파손 시에는
        [1:1문의]를 통해 연락주세요.
      </p>
      <button
        onClick={onExchange}
        className={cn(
          'm-[20px] min-w-[360px] rounded-[10px] bg-green-500 px-[10px] py-[14px] font-bold text-white',
          isDisabled && 'bg-gray-400 text-gray-600',
        )}
        disabled={isDisabled}
      >
        포인트 교환하기
      </button>
    </div>
  )
}

export default ProductDetailFooter
