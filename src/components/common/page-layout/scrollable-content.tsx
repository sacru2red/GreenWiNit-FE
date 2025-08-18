import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const scrollableContentVariants = cva('flex flex-1 flex-col overflow-y-auto', {
  variants: {},
  defaultVariants: {},
})

type ScrollableContentProps = VariantProps<typeof scrollableContentVariants> &
  React.HTMLAttributes<HTMLDivElement>

const ScrollableContent = ({ className, ...props }: ScrollableContentProps) => {
  return <div {...props} className={cn(scrollableContentVariants(), className)}></div>
}

export default ScrollableContent
