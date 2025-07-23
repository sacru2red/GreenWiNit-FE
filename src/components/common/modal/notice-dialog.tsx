import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NoticeDialogProps {
  title?: string
  description: string
  paragraph?: string
  onConfirm: () => void
}

function NoticeDialog({ title, description, paragraph, onConfirm }: NoticeDialogProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-[200px] w-[228px] gap-0">
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
