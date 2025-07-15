import { MouseEventHandler, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function BottomNavigation() {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  // 이스터에그: 마이페이지 버튼 빠른 클릭 카운트용
  const [myPageClickCount, setMyPageClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleMyPageClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (import.meta.env.MODE === 'production') {
      return
    }

    const now = Date.now()
    // 1초 이내 연속 클릭
    if (now - lastClickTime < 1000) {
      const newCount = myPageClickCount + 1
      setMyPageClickCount(newCount)
      setLastClickTime(now)
      if (newCount >= 3) {
        localStorage.clear()
        window.location.href = '/'
      }
    } else {
      // 1초 이상이면 카운트 리셋
      setMyPageClickCount(1)
      setLastClickTime(now)
    }
  }, [myPageClickCount, lastClickTime])

  const handleItemClick = useCallback(
    (itemValue: number) => {
      setValue(itemValue)

      switch (itemValue) {
        case 0:
          navigate('/')
          break
        case 1:
          navigate('/information-share')
          break
        default:
          break
      }
    },
    [navigate],
  )

  return (
    <nav className="border-t border-gray-200 bg-white shadow-lg">
      <div className="flex h-16 items-center justify-around px-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.value}
            onClick={item.value === 3 ? handleMyPageClick : () => handleItemClick(item.value)}
            className={`group relative flex h-full flex-1 flex-col items-center justify-center transition-all duration-50 ease-in ${
              value === item.value ? 'text-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {/* 클릭 시 퍼지는 애니메이션 효과 */}
            <div className="absolute inset-0 rounded-lg transition-all duration-50 ease-in-out group-active:bg-gray-100" />
            <img
              src={item.icon}
              alt={item.label}
              className="relative mb-1 h-6 w-6 transition-all duration-50 group-hover:opacity-80"
            />
            <span className="relative text-sm leading-tight font-medium transition-all duration-50 group-hover:opacity-80">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

const NAV_ITEMS = [
  {
    icon: '/icons/home.svg',
    label: '홈',
    value: 0,
  },
  {
    icon: '/icons/share.svg',
    label: '정보공유',
    value: 1,
  },
  {
    icon: '/icons/shop.svg',
    label: '포인트상점',
    value: 2,
  },
  {
    icon: '/icons/person.svg',
    label: '마이페이지',
    value: 3,
  },
] as const

export default BottomNavigation
