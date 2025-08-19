import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const logoIconVariants = cva(
  'h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-no-repeat [background-position-x:center] [background-position-y:center]',
  {
    variants: {
      size: {
        small: 'h-[20px] w-[20px] bg-contain',
        medium: 'h-[46px] w-[46px] bg-contain',
        large: 'h-[92px] w-[92px]',
      },
      type: {
        logo: 'bg-[url("/img/logo-icon.png")] bg-cover bg-size-[50px]',
        profile: 'bg-cover bg-center',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
)

type LogoIconProps = VariantProps<typeof logoIconVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    profileImage?: string | null
  }

const LogoIcon = ({ className, size, profileImage, ...props }: LogoIconProps) => {
  const type = profileImage ? 'profile' : 'logo'

  return (
    <div
      className={cn(logoIconVariants({ size, type }), className)}
      style={profileImage ? { backgroundImage: `url(${profileImage})` } : undefined}
      {...props}
    />
  )
}

export default LogoIcon
