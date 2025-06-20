import AppTitle from '@/components/common/AppTitle'
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
      <div className="flex h-12 w-full items-center justify-center bg-white">
        <AppTitle className="!text-3xl" />
      </div>
      <div className="m-2 mt-6 flex flex-row items-center gap-2 rounded-[16px] bg-white p-4 shadow-lg">
        <div className="h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url('/img/logo-icon.png')] bg-cover bg-center bg-no-repeat" />
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {user == null ? (
            <Fragment>
              <p className="font-bold">로그인이 필요합니다.</p>
              <button className="bg-transparent" onClick={handleLoginClick}>
                로그인
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="font-bold">{user.name}님</p>
              <button className="bg-transparent" onClick={logout}>
                로그아웃
              </button>
            </Fragment>
          )}
        </div>
      </div>
      <button className="mt-6 h-[48px] w-[343px] rounded-[8px] bg-[#0FBA7E] text-[16px] font-bold text-white">
        참여 챌린지
      </button>
      <div className="mt-10 flex h-[48px] w-full flex-row text-[16px]">
        <button className="h-full w-full border-b-[4px] border-b-[#0FBA7E] font-bold text-[#0FBA7E]">
          개인
        </button>
        <button className="h-full w-full">팀</button>
      </div>
      <div className="flex w-full flex-col pt-6">
        <div className="flex w-[334px] flex-row gap-1">
          <span className="text-[20px] font-bold text-[#404040]">개인 챌린지</span>
          <img src="/icons/infocircle.svg" />
        </div>
        <div className="mt-4 flex flex-row gap-4 pl-4">
          <div className="flex h-[164px] w-[164px] flex-col rounded-[8px] bg-white shadow-lg">
            <div className="h-[90px] w-full rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-[12px] text-start">
              <span className="text-[14px] font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-[14px] text-[#737373]">25.08.01 ~ 08.,30</span>
            </div>
          </div>
          <div className="flex h-[164px] w-[164px] flex-col rounded-[8px] bg-white shadow-lg">
            <div className="h-[90px] w-full rounded-t-[8px]">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-[12px] text-start">
              <span className="text-[14px] font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-[14px] text-[#737373]">25.08.01 ~ 08.,30</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}

export default Main
