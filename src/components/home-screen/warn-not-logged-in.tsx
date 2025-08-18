import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/shadcn/dialog'
import { Button } from '@/components/common/button'
import { useNavigate, useRouter } from '@tanstack/react-router'

interface WarnNotLoggedInProps {
  isOpen: boolean
  onOpenChange(open: boolean): void
  message?: string
  infoMessageAfterRedirecting?: string
  backButtonAction?: 'close' | 'back'
}

const WarnNotLoggedIn = ({
  isOpen,
  onOpenChange,
  message = `로그인 후,\n챌린지에 참여할 수 있어요.`,
  infoMessageAfterRedirecting: infoMessageAfterRedirecting,
  backButtonAction = 'close',
}: WarnNotLoggedInProps) => {
  const navigate = useNavigate()
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogDescription className="text-center whitespace-pre text-black">
          {message}
        </DialogDescription>
        <DialogFooter className="flex flex-row gap-6 sm:justify-center">
          <Button
            variant="cancel"
            size="flex"
            onClick={() => {
              onOpenChange(false)
              if (backButtonAction === 'back') {
                router.history.back()
              }
            }}
          >
            취소
          </Button>
          <Button
            size="flex"
            onClick={() =>
              navigate({ to: '/login', search: { message: infoMessageAfterRedirecting } })
            }
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WarnNotLoggedIn
