import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageBodySectionVariants = cva('flex flex-1 flex-col mt-2 mb-2 p-4 w-full relative', {
  variants: {
    padding: {
      default: 'p-4',
      zero: 'p-0',
    },
    bg: {
      theme: 'bg-white',
      form: 'bg-white',
    },
  },
  defaultVariants: {
    padding: 'default',
    bg: 'theme',
  },
})

type PageBodySectionProps = VariantProps<typeof pageBodySectionVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageBodySection = ({ className, padding, bg, ...props }: PageBodySectionProps) => {
  return (
    <main {...props} className={cn(pageBodySectionVariants({ padding, bg }), className)}></main>
  )
}

export default PageBodySection
