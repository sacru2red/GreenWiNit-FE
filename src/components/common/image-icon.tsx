import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const imageIconVariants = cva(
  'h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-cover bg-size-[50px] bg-no-repeat [background-position-x:center] [background-position-y:center]',
  {
    variants: {
      size: {
        small: 'h-[20px] w-[20px] bg-contain',
        medium: 'h-[46px] w-[46px] bg-contain',
        large: 'h-[92px] w-[92px]',
      },
      type: {
        logo: 'bg-[url("/img/logo-icon.png")]',
        profile: 'bg-[url("/img/profile.png")]',
      },
    },
    defaultVariants: {
      size: 'medium',
      type: 'logo',
    },
  },
)

type RequiredImageIconProps = Omit<VariantProps<typeof imageIconVariants>, 'type'> & {
  type: 'logo' | 'profile'
}

type imageIconVariants = RequiredImageIconProps & React.HTMLAttributes<HTMLDivElement>

const ImageIcon = ({ className, size, type, ...props }: imageIconVariants) => {
  return <div className={cn(imageIconVariants({ size, type }), className)} {...props} />
}

export default ImageIcon
