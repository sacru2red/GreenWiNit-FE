import { TabProps } from '@/components/home-screen/Challenges/type'

function MyChallengesCategory({ tab, setTab }: TabProps) {
  const selectedButtonStyle =
    'flex justify-center items-center border-mountain_meadow text-secondary-foreground h-[38px] w-[55px] rounded-full border-[2px] bg-white absolute top-0 z-10 transition-all duration-200'

  return (
    <div className="relative flex h-[38px] w-[110px] items-center rounded-full bg-[#EFEFEF] px-1 text-sm font-bold">
      {tab === 'individual' && <div className={selectedButtonStyle + ' left-0'}>개인</div>}
      {tab === 'team' && <div className={selectedButtonStyle + ' right-0'}>팀</div>}

      {tab !== 'individual' && (
        <>
          <button
            onClick={() => setTab('individual')}
            className="text-lighter-gray absolute left-0 z-20 h-[32px] w-[56px] rounded-full"
          >
            개인
          </button>
        </>
      )}

      {tab !== 'team' && (
        <button
          onClick={() => setTab('team')}
          className="text-lighter-gray absolute right-0 z-20 h-[32px] w-[56px] rounded-full"
        >
          팀
        </button>
      )}
    </div>
  )
}

export default MyChallengesCategory
