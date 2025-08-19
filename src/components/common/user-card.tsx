import { useUserStatus } from '@/hooks/use-user-status'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import LogoIcon from './logo-icon'
import { Separator } from '@/components/shadcn/separator'
import useUserName from '@/hooks/use-user-name'
import { authStore } from '@/store/auth-store'
import useUserEmail from '@/hooks/use-user-email'
import useUserProfileImageUrl from '@/hooks/use-user-profile-image-url'
import ProfileImage from '@/components/common/profile-image'

const UserCard = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const accessToken = authStore((state) => state.accessToken)
  const userName = useUserName()
  const userEmail = useUserEmail()
  const userProfileImageUrl = useUserProfileImageUrl()

  const handleLoginClick = () => {
    navigate({ to: '/login' })
  }

  const { data } = useUserStatus({ enabled: !!accessToken })
  const userChallengeCount = data?.result?.userChallengeCount ?? 0
  const userTotalPoints = data?.result?.userTotalPoints ?? 0
  const userLevel = data?.result?.userLevel ?? 0

  const CARD_ITEMS = [
    {
      title: '포인트 현황',
      content: `${userTotalPoints}p`,
      href: '/my-page/my-points',
    },
    {
      title: '인증 챌린지',
      content: `${userChallengeCount}회`,
      href: '/my-page/challenges/certified',
    },
    {
      title: '나의 레벨',
      content: `Lv.${userLevel}`,
    },
  ]

  return (
    <div className="border-lighter-gray-border flex flex-col items-center rounded-2xl border bg-white">
      <div className="flex w-full items-center gap-8 px-5 py-4">
        {userProfileImageUrl ? (
          <ProfileImage imageUrl={userProfileImageUrl} />
        ) : (
          <LogoIcon size="large" />
        )}
        {!userName ? (
          <button onClick={handleLoginClick} className="text-start text-lg font-bold">
            로그인이 필요합니다.
          </button>
        ) : (
          <div className="flex flex-1 flex-col items-start gap-2">
            <strong className="text-xl font-bold">{userName}님</strong>
            {pathname === '/' ? (
              <p className="text-start text-nowrap">
                환경 챌린지에 참여하고
                <br />
                포인트를 모아보세요
              </p>
            ) : (
              <p className="text-light-gray text-start text-sm text-nowrap">{userEmail}</p>
            )}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex w-full items-center justify-center gap-8 p-4">
        {CARD_ITEMS.map((item, i) => {
          const children = (
            <>
              <span className="text-mountain_meadow text-center text-sm font-bold">
                {data == null ? '?' : item.content}
              </span>
              <span className="text-secondary-foreground text-sm">{item.title}</span>
            </>
          )

          return item.href ? (
            <Link to={item.href} key={i} className="flex flex-col">
              {children}
            </Link>
          ) : (
            <div key={i} className="flex flex-col">
              {children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserCard
