import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  Button as ShadcnButton,
  buttonVariants as shadcnButtonVariants,
} from '@/components/shadcn/button'

const buttonVariants = cva(
  "bg-mountain h-fit_meadow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive p-4 hover:bg-mountain_meadow/80",
  {
    variants: {
      variant: {
        default: 'rounded-lg p-4 text-base font-bold text-white border-transparent',
        disabled: 'text-white bg-[#c0c0c0] !cursor-not-allowed hover:bg-[#c0c0c0]',
        cancel: 'border-mountain_meadow rounded-lg border bg-white hover:bg-white',
      },
      size: {
        default: 'p-4',
        sm: 'px-8 py-3',
        icon: 'size-9',
        flex: 'flex flex-[1]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants | typeof shadcnButtonVariants> & {
    asChild?: boolean
  }) {
  return (
    <ShadcnButton
      data-slot="button"
      className={cn(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        shadcnButtonVariants({ variant, size, className }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        buttonVariants({ variant, size, className }),
      )}
      {...props}
      disabled={props.disabled || variant === 'disabled'}
    />
  )
}

export { Button }
