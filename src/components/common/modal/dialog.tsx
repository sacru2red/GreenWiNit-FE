import {
  Dialog as ShadcnDialog,
  DialogClose as ShadcnDialogClose,
  DialogContent as ShadcnDialogContent,
  DialogDescription as ShadcnDialogDescription,
  DialogFooter as ShadcnDialogFooter,
  DialogHeader as ShadcnDialogHeader,
  DialogOverlay as ShadcnDialogOverlay,
  DialogPortal as ShadcnDialogPortal,
  DialogTitle as ShadcnDialogTitle,
  DialogTrigger as ShadcnDialogTrigger,
} from '@/components/shadcn/dialog'
import { ComponentProps } from 'react'

export function DialogContent({
  showCloseButton = false,
  ...restProps
}: ComponentProps<typeof ShadcnDialogContent>) {
  return <ShadcnDialogContent {...restProps} showCloseButton={showCloseButton} />
}

 
export const Dialog = ShadcnDialog
export const DialogClose = ShadcnDialogClose
export const DialogDescription = ShadcnDialogDescription
export const DialogFooter = ShadcnDialogFooter
export const DialogHeader = ShadcnDialogHeader
export const DialogOverlay = ShadcnDialogOverlay
export const DialogPortal = ShadcnDialogPortal
export const DialogTitle = ShadcnDialogTitle
export const DialogTrigger = ShadcnDialogTrigger
