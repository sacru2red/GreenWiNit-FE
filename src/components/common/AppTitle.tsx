import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 시안상에서는 font-size: 40px; 4xl -> 36px;
const appTitleVariants = cva('font-jalnan !text-4xl text-mountain_meadow', {
  variants: {},
  defaultVariants: {},
})

type AppTitleProps = VariantProps<typeof appTitleVariants> &
  React.HTMLAttributes<HTMLHeadingElement>

const AppTitle = ({ className, ...props }: AppTitleProps) => {
  return (
    <h1 {...props} className={cn(appTitleVariants(className), className)}>
      <img src="/img/logo-title.png" alt="Greenwinit" className="w-[20vw]" />
    </h1>
  )
}

export default AppTitle
