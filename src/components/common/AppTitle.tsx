import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 시안상에서는 font-size: 40px; 4xl -> 36px;
const appTitleVariants = cva('font-jalnan !text-4xl text-mountain_meadow', {
  variants: {},
  defaultVariants: {},
})

type AppTitleProps = VariantProps<typeof appTitleVariants>

const AppTitle = ({ ...props }: AppTitleProps) => {
  return <h1 className={cn(appTitleVariants(props))}>Greenwinit</h1>
}

export default AppTitle
