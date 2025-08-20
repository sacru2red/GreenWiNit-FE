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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
}: ComponentProps<typeof ShadcnDialogContent>) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <ShadcnDialogContent {...restProps} showCloseButton={showCloseButton} />
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const Dialog = ShadcnDialog
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogClose = ShadcnDialogClose
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogDescription = ShadcnDialogDescription
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogFooter = ShadcnDialogFooter
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogHeader = ShadcnDialogHeader
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogOverlay = ShadcnDialogOverlay
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogPortal = ShadcnDialogPortal
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogTitle = ShadcnDialogTitle
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const DialogTrigger = ShadcnDialogTrigger
