import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface NoticeDialogProps {
  isOpen: boolean
  title?: string
  description: string
  paragraph?: string
  setIsOpen: (open: boolean) => void
  onConfirm: () => void
}

function NoticeDialog({
  isOpen,
  title,
  description,
  paragraph,
  setIsOpen,
  onConfirm,
}: NoticeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-6 p-10">
        {title && (
          <DialogTitle className="flex items-center justify-center text-center text-lg leading-3 font-semibold whitespace-pre-line text-black">
            {title}
          </DialogTitle>
        )}
        <DialogDescription className="text-secondary-foreground flex flex-col items-center justify-center text-center text-base whitespace-pre-line">
          {description}
          {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button size="flex" onClick={onConfirm} className="h-10 px-4 py-2.5">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NoticeDialog
