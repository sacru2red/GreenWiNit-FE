import BottomNavigation from '@/components/common/BottomNav'

function Main() {
  return (
    <div className="h-full w-full bg-[#F5F9F7]">
      <div className="flex h-[48px] w-full items-center justify-center bg-white">
        <span className="font-jalnan text-[24px] text-[#0FBA7E]">Greenwinit</span>
      </div>
      <div className="mx-auto mt-6 flex h-[191px] w-[343px] flex-col rounded-[16px] bg-white shadow-lg">
        <div></div>
        <div></div>
      </div>
      <button className="mt-6 h-[48px] w-[343px] rounded-[8px] bg-[#0FBA7E] text-[16px] font-bold text-white">
        참여 챌린지
      </button>
      <div className="mt-10 flex h-[48px] w-full flex-row text-[16px]">
        <button className="h-full w-full border-b-[4px] border-b-[#0FBA7E] font-bold text-[#0FBA7E]">
          개인
        </button>
        <button className="h-full w-full">팀</button>
      </div>
      <div className="flex w-full flex-col pt-6">
        <div className="mx-auto flex w-[334px] flex-row gap-1">
          <span className="text-[20px] font-bold text-[#404040]">개인 챌린지</span>
          <img src="/icons/infocircle.svg" />
        </div>
        <div className="mt-4 flex flex-row gap-4 pl-4">
          <div className="flex h-[164px] w-[164px] flex-col rounded-[8px] bg-white shadow-lg">
            <div className="h-[90px] w-full rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-[12px] text-start">
              <span className="text-[14px] font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-[14px] text-[#737373]">25.08.01 ~ 08.,30</span>
            </div>
          </div>
          <div className="flex h-[164px] w-[164px] flex-col rounded-[8px] bg-white shadow-lg">
            <div className="h-[90px] w-full rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-[12px] text-start">
              <span className="text-[14px] font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-[14px] text-[#737373]">25.08.01 ~ 08.,30</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}

export default Main
