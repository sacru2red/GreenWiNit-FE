import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const logoIconVariants = cva(
  'h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url("/img/logo-icon.png")] bg-cover bg-size-[50px] bg-no-repeat [background-position-x:center] [background-position-y:center]',
  {
    variants: {},
    defaultVariants: {},
  },
)

type LogoIconProps = VariantProps<typeof logoIconVariants> & React.HTMLAttributes<HTMLDivElement>

const LogoIcon = ({ className, ...props }: LogoIconProps) => {
  return <div className={cn(logoIconVariants(className), className)} {...props} />
}

export default LogoIcon
