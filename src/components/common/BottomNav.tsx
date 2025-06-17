function BottomNavigation() {
  const bottomNavigationItems = [
    { icon: '/icons/home.svg', label: '홈' },
    { icon: '/icons/share.svg', label: '정보공유' },
    { icon: '/icons/shop.svg', label: '포인트상점' },
    { icon: '/icons/person.svg', label: '마이페이지' },
  ]
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[77px] w-full flex-row items-center justify-center gap-[14px] bg-white shadow-xl">
      {bottomNavigationItems.map((item) => {
        return (
          <a className="flex h-[56px] w-[75.25px] flex-col items-center justify-center gap-1">
            <img src={item.icon} />
            <span className="text-[14px] text-[#202020]">{item.label}</span>
          </a>
        )
      })}
    </div>
  )
}

export default BottomNavigation
