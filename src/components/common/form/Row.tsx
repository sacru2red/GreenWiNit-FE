import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const Row = ({ className, ...restProps }: ComponentProps<'div'>) => {
  return <div {...restProps} className={cn('flex w-full flex-col items-start gap-1', className)} />
}

export default Row
