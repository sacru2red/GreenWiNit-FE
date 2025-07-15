import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const challengeTypeSwitchVariants = cva('px-3 py-0.5 cursor-pointer border min-w-12', {
  variants: {
    on: {
      true: 'border-mountain_meadow rounded-xl',
      false: 'text-gray-500 border-transparent',
    },
  },
  defaultVariants: {
    on: false,
  },
})

type ChallengeTypeSwitchProps = VariantProps<typeof challengeTypeSwitchVariants> &
  React.HTMLAttributes<HTMLDivElement>

export const ChallengeTypeSwitch = ({ className, on, ...props }: ChallengeTypeSwitchProps) => {
  return <div className={cn(challengeTypeSwitchVariants({ on }), className)} {...props}></div>
}
