import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ChevronLeft as ChevronLeftIcon } from 'lucide-react'
import { ComponentProps, useCallback } from 'react'
import { useRouter } from '@tanstack/react-router'

const pageHeaderSectionVariants = cva(
  'bg-white relative flex flex-row w-full items-center justify-center h-12 border-b border-b-[#F0F0F0]',
  {
    variants: {},
    defaultVariants: {},
  },
)

type PageHeaderSectionProps = VariantProps<typeof pageHeaderSectionVariants> &
  React.HTMLAttributes<HTMLHeadingElement>

const PageHeaderSection = ({ className, ...props }: PageHeaderSectionProps) => {
  return (
    <header {...props} className={cn(pageHeaderSectionVariants(className), className)}></header>
  )
}

const BackIcon = (props: ComponentProps<typeof ChevronLeftIcon>) => {
  const router = useRouter()

  const defaultClickHandler = useCallback(() => {
    router.history.back()
  }, [router])

  return (
    <ChevronLeftIcon
      {...props}
      className={cn('absolute left-4 cursor-pointer', props.className)}
      onClick={props.onClick ?? defaultClickHandler}
    />
  )
}
PageHeaderSection.BackIcon = BackIcon

export default PageHeaderSection
