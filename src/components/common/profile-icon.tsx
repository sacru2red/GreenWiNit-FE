import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const ProfileIconVariants = cva(
  'h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url("/img/logo-profile.png")] bg-cover bg-size-[50px] bg-no-repeat [background-position-x:center] [background-position-y:center]',
  {
    variants: {
      size: {
        small: 'h-[20px] w-[20px] bg-contain',
        medium: 'h-[46px] w-[46px] bg-contain',
        large: 'h-[92px] w-[92px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
)

type ProfileIconProps = VariantProps<typeof ProfileIconVariants> &
  React.HTMLAttributes<HTMLDivElement>

const ProfileIcon = ({ className, size, ...props }: ProfileIconProps) => {
  return <div className={cn(ProfileIconVariants({ size }), className)} {...props} />
}

export default ProfileIcon
