import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const appTitleVariants = cva('font-[Greenwinit-logo] !text-4xl text-mountain_meadow', {
  variants: {},
  defaultVariants: {},
})

type AppTitleProps = VariantProps<typeof appTitleVariants> &
  React.HTMLAttributes<HTMLHeadingElement>

const AppTitle = ({ className, ...props }: AppTitleProps) => {
  return (
    <h1 {...props} className={cn(appTitleVariants(className), className)}>
      Greenwinit
    </h1>
  )
}

export default AppTitle
