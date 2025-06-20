import BottomNavigation from '@/components/common/BottomNav'
import { useUserStore } from '@/store/userStore'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

function Main() {
  const user = useUserStore((s) => s.user)
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()

  console.log('user', user)

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#F5F9F7]">
      <div className="flex h-[48px] w-full items-center justify-center bg-white">
        <span className="font-jalnan text-[24px] text-[#0FBA7E]">Greenwinit</span>
      </div>
      <div className="mt-5 p-4">
        <div className="flex flex-row items-center gap-8 rounded-[16px] bg-white p-6 shadow-lg">
          <div className="h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url('/img/user-default-profile.png')] bg-size-[57px_67px] bg-center bg-no-repeat" />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            {user == null ? (
              <Fragment>
                <p className="font-bold">로그인이 필요합니다.</p>
                <button className="bg-transparent" onClick={handleLoginClick}>
                  로그인
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <p className="w-[80%] text-start text-base leading-[2] break-keep">
                  <span className="text-xl font-bold">{user.name}님</span>
                  <button className="bg-transparent" onClick={logout}>
                    로그아웃
                  </button>
                  <br />
                  환경 챌린지에 참여하고 포인트를 모아보세요
                </p>
              </Fragment>
            )}
          </div>
        </div>
        <button className="!bg-mountain_meadow mt-6 w-full rounded-lg p-4 text-base font-bold text-white">
          참여 챌린지
        </button>
      </div>
      <div className="mt-4 flex w-full flex-row">
        <button className="border-b-mountain_meadow text-mountain_meadow h-full w-full border-b-[4px] p-2 font-bold">
          개인
        </button>
        <button className="h-full w-full p-2">팀</button>
      </div>
      <div className="flex w-full flex-col p-4 pt-8">
        <div className="flex flex-row gap-1">
          <span className="text-xl font-bold text-[#404040]">개인 챌린지</span>
          <img src="/icons/infocircle.svg" />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <div className="rounded- flex flex-col bg-white shadow-lg">
            <div className="w-full rounded-t-lg">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-3 text-start">
              <span className="text-sm font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-sm text-[#737373]">25.08.01 ~ 08.30</span>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white shadow-lg">
            <div className="w-full">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-3 text-start">
              <span className="text-sm font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-sm text-[#737373]">25.08.01 ~ 08.30</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}

export default Main
