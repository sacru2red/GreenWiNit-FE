import { useUserStatus } from '@/hooks/useUserStatus'
import { useUserStore } from '@/store/userStore'
import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '../common/LogoIcon'
import { Separator } from '@/components/ui/separator'

const UserCard = () => {
  const user = useUserStore((s) => s.user)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const { data: userStatus } = useUserStatus()

  const CARD_ITEMS = [
    {
      title: '포인트 현황',
      content: `${userStatus?.point}p`,
      href: '/my-page/my-points',
    },
    {
      title: '인증 챌린지',
      content: `${userStatus?.challengeCount}회`,
      href: '/my-page/challenges/certified',
    },
    {
      title: '나의 레벨',
      content: `Lv.${userStatus?.level.code}`,
    },
  ]

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white shadow-lg">
      <div className="flex w-full items-center gap-8 px-5 py-4">
        <LogoIcon size="large" />
        {user == null ? (
          <button onClick={handleLoginClick} className="text-start text-lg font-bold">
            로그인이 필요합니다.
          </button>
        ) : (
          <div className="flex flex-1 flex-col items-start gap-2">
            <strong className="text-xl font-bold">{user.name}님</strong>
            <p className="text-start">환경 챌린지에 참여하고 포인트를 모아보세요</p>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex w-full items-center justify-center gap-8 p-4">
        {CARD_ITEMS.map((item, i) => {
          return item.href ? (
            <Link to={item.href} key={i} className="flex flex-col">
              <span className="text-mountain_meadow text-center text-sm font-bold">
                {userStatus == null ? '?' : item.content}
              </span>
              <span className="text-secondary-foreground text-sm">{item.title}</span>
            </Link>
          ) : (
            <div className="flex flex-col" key={i}>
              <span className="text-mountain_meadow text-center text-sm font-bold">
                {userStatus == null ? '?' : item.content}
              </span>
              <span className="text-secondary-foreground text-sm">{item.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserCard
