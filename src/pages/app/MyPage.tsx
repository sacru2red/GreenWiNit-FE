import BottomNavigation from "@/components/common/BottomNav";
import { Card, CardAction, CardContent } from "@/components/ui/card";

function MyPage() {
  const cardItems = [
    {
      title: "SNS",
      items: [
        { title: "인스타그램", url: "" },
        { title: "블로그", url: "" },
      ],
    },
    {
      title: "고객센터",
      items: [
        { title: "1:1문의", url: "" },
        { title: "FAQ", url: "" },
      ],
    },
    {
      title: "환경설정",
      items: [
        { title: "약관 및 정책", url: "" },
        { title: "회원정보수정", url: "" },
        { title: "회원탈퇴", url: "" },
        { title: "로그아웃", url: "" },
      ],
    },
  ];

  return (
    <div className="bg-[#F5F9F7] w-full h-full overflow-y-auto">
      <div className="bg-white w-full h-[48px] flex items-center justify-center py-8">
        <span className="text-black text-[24px] font-bold">마이페이지</span>
      </div>
      <div className="felx flex-col overflow-y-auto pb-40">
        {cardItems.map((cardItem) => {
          return (
            <Card className="w-[343px] bg-white h-fit rounded-[16px] shadow-lg mx-auto mt-6 p-0">
              <CardContent className="flex flex-col">
                <div className="flex flex-row items-center justify-center w-full p-[16px] font-bold">
                  {cardItem.title}
                </div>
                {cardItem.items.map((item, itemIndex) => {
                  return (
                    <CardAction
                      key={itemIndex}
                      className="flex flex-row items-center w-full border-t-[1px] border-t-[9E9E9E] p-[16px]"
                    >
                      <span className="text-[#404040] text-[16px]">
                        {item.title}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto"
                      >
                        <path
                          d="M8 4L14 10L8 16"
                          stroke="#9E9E9E"
                          stroke-width="2"
                        />
                      </svg>
                    </CardAction>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default MyPage;
