import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type ConfirmDialogProps = {
  isOpen: boolean
  title?: string
  description: string
  paragraph?: string
  setIsOpen: (open: boolean) => void
  onConfirm: () => void
}

function ConfirmDialog({
  isOpen,
  title,
  description,
  paragraph,
  setIsOpen,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-6 p-8" showCloseButton={false}>
        {title && (
          <DialogTitle className="flex items-center justify-center text-center text-lg font-semibold">
            {title}
          </DialogTitle>
        )}
        <DialogDescription className="text-secondary-foreground text-center text-base whitespace-pre-wrap">
          {description}
          {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button
            size="flex"
            variant="cancel"
            onClick={() => setIsOpen(false)}
            className="h-10 px-4 py-2.5"
          >
            취소
          </Button>
          <Button size="flex" onClick={onConfirm} className="h-10 px-4 py-2.5">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
