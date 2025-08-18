import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageContainerVariants = cva('flex h-dvh w-full flex-col', {
  variants: {
    bg: {
      theme: 'bg-card',
      form: 'bg-white',
    },
  },
  defaultVariants: {
    bg: 'theme',
  },
})

type PageContainerProps = VariantProps<typeof pageContainerVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageContainer = ({ className, bg, ...props }: PageContainerProps) => {
  return <div {...props} className={cn(pageContainerVariants({ bg }), className)}></div>
}

export default PageContainer
