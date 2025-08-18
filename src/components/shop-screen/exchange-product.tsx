import { cn } from '@/lib/utils'
import { Button } from '@/components/common/button'

interface ExchangeProductProps {
  availablePoint: number
  deductPoint: number
  handleClick: () => void
}

const ExchangeProduct = ({ availablePoint, deductPoint, handleClick }: ExchangeProductProps) => {
  const isDisabled = availablePoint < deductPoint

  return (
    <div className="w-full">
      <p className="px-4 pt-4 text-sm whitespace-pre-line">
        * 본 리워드는 봉사프로젝트 굿즈로 환불과 교환이 불가합니다. <br />
        제품 불량 및 파손 시에는 [1:1문의]를 통해 연락주세요.
      </p>
      <div className="w-full p-4">
        <Button
          onClick={handleClick}
          className={cn(
            'w-full rounded-md p-6 font-bold text-white',
            isDisabled && 'bg-gray-400 text-gray-600',
          )}
          disabled={isDisabled}
        >
          포인트 교환하기
        </Button>
      </div>
    </div>
  )
}

export default ExchangeProduct
