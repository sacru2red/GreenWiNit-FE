import BottomNavigationMui from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BottomNavigation() {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  // 이스터에그: 마이페이지 버튼 빠른 클릭 카운트용
  const [myPageClickCount, setMyPageClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleMyPageClick: MouseEventHandler<HTMLButtonElement> = () => {
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
        window.location.reload()
      }
    } else {
      // 1초 이상이면 카운트 리셋
      setMyPageClickCount(1)
      setLastClickTime(now)
    }
  }

  return (
    <BottomNavigationMui
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue)
      }}
      sx={{
        '.Mui-selected': { color: 'black' },
        '& .MuiBottomNavigationAction-label': {
          fontSize: '0.875rem',
          marginTop: '0.25rem',
        },
      }}
    >
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/home.svg" />}
        label="홈"
        onClick={() => navigate('/')}
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/share.svg" />}
        label="정보공유"
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/shop.svg" />}
        label="포인트상점"
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/person.svg" />}
        label="마이페이지"
        onClick={handleMyPageClick}
      />
    </BottomNavigationMui>
  )
}

export default BottomNavigation
