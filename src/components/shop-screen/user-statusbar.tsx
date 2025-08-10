interface UserStatusbarProps {
  point: number
  availablePoint: number
}

const UserStatusbar = ({ point, availablePoint }: UserStatusbarProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between px-4 pt-4">
        <div className="flex flex-col items-baseline">
          <p className="mb-1 text-xs text-gray-500">나의 포인트</p>
          <p className="text-2xl font-semibold text-black">{point}</p>
        </div>
        <button className="rounded-[25px] bg-green-100 px-4 py-2 text-sm text-green-700">
          포인트 내역
        </button>
      </div>
      <div className="self-start px-4 py-2 text-start">
        <p className="text-sm text-black">사용 가능 포인트: {availablePoint}p</p>
      </div>
    </div>
  )
}

export default UserStatusbar
