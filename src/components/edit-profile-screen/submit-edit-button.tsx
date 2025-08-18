import { Button } from '@/components/shadcn/button'

function SubmitEditButton({ isNicknameDuplicated }: { isNicknameDuplicated: boolean }) {
  return (
    <Button size="flex" type="submit" variant={isNicknameDuplicated ? 'default' : 'disabled'}>
      수정하기
    </Button>
  )
}

export default SubmitEditButton
