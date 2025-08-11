import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

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
      <p className="px-2 pt-4 text-sm">
        * 본 리워드는 봉사형 프로젝트 굿즈로 환불 및 교환이 불가능합니다. <br />
        제품 불량 및 파손 시에는 [1:1문의]를 통해 연락주세요.
      </p>
      <Button
        onClick={onExchange}
        className={cn(
          'm-4 min-w-90 rounded-md px-4 py-4 font-bold text-white',
          isDisabled && 'bg-gray-400 text-gray-600',
        )}
        disabled={isDisabled}
      >
        포인트 교환하기
      </Button>
    </div>
  )
}

export default ProductDetailFooter
