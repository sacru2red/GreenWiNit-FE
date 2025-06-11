import BottomNavigation from "@/components/common/BottomNav";

function Main() {
  return (
    <div className="bg-[#F5F9F7] w-full h-full">
      <div className="bg-white w-full h-[48px] flex items-center justify-center">
        <span className="font-jalnan text-[#0FBA7E] text-[24px]">
          Greenwinit
        </span>
      </div>
      <div className="w-[343px] bg-white h-[191px] rounded-[16px] shadow-lg mx-auto mt-6 flex flex-col">
        <div></div>
        <div></div>
      </div>
      <button className="w-[343px] bg-[#0FBA7E] h-[48px] text-white text-[16px] font-bold mt-6 rounded-[8px]">
        참여 챌린지
      </button>
      <div className="flex flex-row w-full h-[48px] text-[16px] mt-10">
        <button className="text-[#0FBA7E] w-full h-full font-bold border-b-[4px] border-b-[#0FBA7E]">
          개인
        </button>
        <button className="w-full h-full">팀</button>
      </div>
      <div className="flex flex-col w-full pt-6">
        <div className="flex flex-row gap-1 w-[334px] mx-auto">
          <span className="text-[20px] font-bold text-[#404040]">
            개인 챌린지
          </span>
          <img src="/icons/infocircle.svg" />
        </div>
        <div className="flex flex-row mt-4 gap-4 pl-4">
          <div className="flex flex-col w-[164px] h-[164px] bg-white rounded-[8px] shadow-lg">
            <div className="w-full h-[90px] rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="h-full flex-1 flex flex-col p-[12px] gap-1 text-start">
              <span className="text-[#404040] text-[14px] font-bold">
                오늘은 따릉이 타는날
              </span>
              <span className="text-[#737373] text-[14px]">
                25.08.01 ~ 08.,30
              </span>
            </div>
          </div>
          <div className="flex flex-col w-[164px] h-[164px] bg-white rounded-[8px] shadow-lg">
            <div className="w-full h-[90px] rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="h-full flex-1 flex flex-col p-[12px] gap-1 text-start">
              <span className="text-[#404040] text-[14px] font-bold">
                오늘은 따릉이 타는날
              </span>
              <span className="text-[#737373] text-[14px]">
                25.08.01 ~ 08.,30
              </span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Main;
