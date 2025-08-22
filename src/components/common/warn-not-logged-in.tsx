import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'
import { useNavigate, useRouter } from '@tanstack/react-router'

interface WarnNotLoggedInProps {
  isOpen: boolean
  onOpenChange(open: boolean): void
  content?: string
  backButtonAction?: 'close' | 'back'
}

const WarnNotLoggedIn = ({
  isOpen,
  onOpenChange,
  content = '챌린지',
  backButtonAction = 'close',
}: WarnNotLoggedInProps) => {
  const navigate = useNavigate()
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogDescription className="text-center whitespace-pre text-black">
          <p className="mb-2">{`로그인 후,\n${content}에 참여할 수 있어요`}</p>
          <p>로그인하시겠습니까?</p>
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
              navigate({
                to: '/login',
                search: { message: `${content}를 확인하기 위해 로그인해주세요.` },
              })
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
