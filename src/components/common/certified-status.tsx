import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { CertificationStatus } from '@/types/certification'

const statusBadge = cva('text-center w-fit rounded-sm', {
  variants: {
    tone: {
      paid: 'text-mountain_meadow bg-[#E1F8F1]',
      unpaid: 'text-error bg-[#FFE4E5]',
    },
    size: {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-3 py-1',
    },
  },
  defaultVariants: {
    tone: 'unpaid',
    size: 'sm',
  },
})

interface CertifiedStatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadge> {
  status: CertificationStatus
}

const statusToTone: Record<CertificationStatus, 'paid' | 'unpaid'> = {
  지급: 'paid',
  미지급: 'unpaid',
}

function CertifiedStatus({ status, className, ...props }: CertifiedStatusProps) {
  return (
    <span className={cn(statusBadge({ tone: statusToTone[status] }), className)} {...props}>
      {status}
    </span>
  )
}

export default CertifiedStatus
