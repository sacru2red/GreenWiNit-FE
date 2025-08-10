import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageBodySectionVariants = cva('flex flex-1 flex-col overflow-y-auto mt-4 mb-4 p-4', {
  variants: {},
  defaultVariants: {},
})

type PageBodySectionProps = VariantProps<typeof pageBodySectionVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageBodySection = ({ className, ...props }: PageBodySectionProps) => {
  return <main {...props} className={cn(pageBodySectionVariants(className), className)}></main>
}

export default PageBodySection
