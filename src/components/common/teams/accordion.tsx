import { useState } from 'react'

const Accordion = ({ title, description }: { title: string; description: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex w-full items-center rounded-[12px] bg-white px-4 py-[18px] shadow-md">
      <span className="flex-1 text-start leading-[18px] font-semibold text-[#424242]">{title}</span>
      {isOpen ? (
        <button onClick={() => setIsOpen(true)}>
          <img src="/icons/arrow-bottom.svg" alt="닫기 버튼" width={24} height={24} />
        </button>
      ) : (
        <button onClick={() => setIsOpen(false)}>
          <img src="/icons/arrow-right.svg" alt="열기 버튼" width={24} height={24} />
        </button>
      )}
      {isOpen && (
        <div className="absolute bottom-0 left-0 w-full bg-[#F8F9FA] p-4 text-sm text-[#424242] shadow-md">
          {description}
        </div>
      )}
    </div>
  )
}

export default Accordion
