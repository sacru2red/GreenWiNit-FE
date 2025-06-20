import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const subTitleVariants = cva('text-base text-light-gray', {
  variants: {},
  defaultVariants: {},
})

type SubTitleProps = VariantProps<typeof subTitleVariants>

const SubTitle = ({ ...props }: SubTitleProps) => {
  return <span className={cn(subTitleVariants(props))}>함께 이기는 환경 챌린지</span>
}

export default SubTitle
