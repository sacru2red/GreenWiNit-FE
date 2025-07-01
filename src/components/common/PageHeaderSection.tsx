import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ComponentProps, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const pageHeaderSectionVariants = cva(
  'bg-white relative flex flex-row w-full items-center justify-center h-12 border-b border-b-[#F0F0F0]',
  {
    variants: {},
    defaultVariants: {},
  },
)

type PageHeaderSectionProps = VariantProps<typeof pageHeaderSectionVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageHeaderSection = ({ className, ...props }: PageHeaderSectionProps) => {
  return <div {...props} className={cn(pageHeaderSectionVariants(className), className)}></div>
}

const BackIcon = (props: ComponentProps<typeof ChevronLeftIcon>) => {
  const navigate = useNavigate()

  const defaultClickHandler = useCallback(() => {
    navigate(-1)
  }, [navigate])

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
