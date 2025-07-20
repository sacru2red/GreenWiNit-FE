import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ProductDetailLabelProps {
  label: string
  point: string | number | undefined
  valueClassName?: string
  isButton?: boolean
  remainingQuantity?: number
  onQuantityChange?: (quantity: number) => void
  selectedQuantity?: number
}

const ProductDetailLabel = ({
  label,
  point,
  valueClassName = '',
  isButton = false,
  remainingQuantity = 0,
  onQuantityChange,
  selectedQuantity = 1,
}: ProductDetailLabelProps) => {
  const [selectedCount, setSelectedCount] = useState(selectedQuantity)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedCount(selectedQuantity)
  }, [selectedQuantity])

  const handleDownClick = () => {
    if (remainingQuantity > 0) {
      setIsOpen(!isOpen)
    }
  }

  const handleQuantitySelect = (quantity: number) => {
    setSelectedCount(quantity)
    setIsOpen(false)
    onQuantityChange?.(quantity)
  }

  const quantityOptions = Array.from({ length: remainingQuantity }, (_, i) => i + 1)

  return (
    <div className="text-md relative flex flex-row justify-between p-[16px]">
      <p className="text-black">{label}</p>
      {isButton ? (
        <div className="relative">
          <button
            className={`flex items-center gap-5 rounded-[5px] px-[10px] py-[5px] ${
              remainingQuantity === 0
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={handleDownClick}
            disabled={remainingQuantity === 0}
          >
            {remainingQuantity === 0 ? '품절' : selectedCount}
            <ChevronDown size={16} />
          </button>
          {isOpen && remainingQuantity > 0 && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full right-0 z-20 mt-1 overflow-y-auto bg-gray-500 font-bold text-black">
                {quantityOptions.map((quantity) => (
                  <button
                    key={quantity}
                    onClick={() => handleQuantitySelect(quantity)}
                    className={`transition-color w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${selectedCount === quantity ? 'bg-gray-200 text-black' : 'bg-gray-400'} `}
                  >
                    {quantity}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <p className={cn('font-bold', valueClassName)}>{point}p</p>
      )}
    </div>
  )
}

export default ProductDetailLabel
