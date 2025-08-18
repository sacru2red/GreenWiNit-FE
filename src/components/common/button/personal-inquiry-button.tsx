import { Button } from '@/components/common/button'

const PersonalInquiryButton = () => {
  return (
    <div className="flex w-full">
      <Button className="flex gap-2" size="flex">
        <img src="/icons/chat.svg" alt="채팅 아이콘" width={20} height={20} />
        <span>1:1 문의하기</span>
      </Button>
    </div>
  )
}

export default PersonalInquiryButton
