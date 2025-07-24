import { Button } from '@/components/ui/button'

function SubmitEditButton() {
  return (
    <div className="absolute bottom-4 left-0 mt-[168px] flex w-full px-4 py-6">
      <Button size="flex" type="submit">
        수정하기
      </Button>
    </div>
  )
}

export default SubmitEditButton
