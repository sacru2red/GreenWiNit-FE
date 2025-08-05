function EmptyPointHistory() {
  return (
    <div className="flex flex-col items-center p-5">
      <img src="/icons/notice-gray.svg" alt="알림 아이콘" width={40} height={40} />
      <h2 className="mt-6 text-xl font-bold text-[#606060]">포인트 내역이 없습니다.</h2>
      <p className="mt-5 text-center whitespace-pre-wrap text-[#a0a0a0]">{`챌린지를 통해 포인트를 획득하고,\n포인트 상점에서 리워드를 교환해보세요!`}</p>
    </div>
  )
}

export default EmptyPointHistory
