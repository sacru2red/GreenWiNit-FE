function BottomNavigation() {
  const bottomNavigationItems = [
    { icon: "/icons/home.svg", label: "홈" },
    { icon: "/icons/share.svg", label: "정보공유" },
    { icon: "/icons/shop.svg", label: "포인트상점" },
    { icon: "/icons/person.svg", label: "마이페이지" },
  ];
  return (
    <div className="flex flex-row gap-[14px] shadow-xl w-full h-[77px] items-center justify-center bg-white fixed bottom-0 left-0 z-50">
      {bottomNavigationItems.map((item: any) => {
        return (
          <a className="w-[75.25px] h-[56px] flex flex-col items-center justify-center gap-1">
            <img src={item.icon} />
            <span className="text-[#202020] text-[14px]">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export default BottomNavigation;
