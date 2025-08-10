import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageFooterSectionVariants = cva('flex mt-auto w-full', {
  variants: {},
  defaultVariants: {},
})

type PageFooterSectionProps = VariantProps<typeof pageFooterSectionVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageFooterSection = ({ className, ...props }: PageFooterSectionProps) => {
  return (
    <footer {...props} className={cn(pageFooterSectionVariants(className), className)}></footer>
  )
}

export default PageFooterSection
