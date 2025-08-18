import { Textarea as ShadcnTextarea } from '@/components/shadcn/textarea'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

const textareaVariants = cva('h-[4lh] py-3 px-4', {
  variants: {},
  defaultVariants: {},
})

type TextareaProps = VariantProps<typeof textareaVariants> & ComponentProps<'textarea'>

const Textarea = ({ className, ...props }: TextareaProps) => {
  return <ShadcnTextarea className={cn(textareaVariants({ className }))} {...props} />
}

export default Textarea
