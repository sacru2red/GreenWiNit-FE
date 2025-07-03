import { type Team } from '@/api/challenges'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/userStore'

interface TeamCardProps {
  team: Team & { isJoinAllowed?: boolean }
  onClick?: () => void
}

const TeamCard = ({ team, onClick }: TeamCardProps) => {
  const user = useUserStore((state) => state.user)
  const teamLeader = team.users.find((t) => t.isLeader)

  return (
    <button
      onClick={onClick}
      disabled={!team.isJoinAllowed}
      className={cn(
        'overflow-hidden rounded-lg bg-white',
        team.isJoinAllowed === false && '!cursor-not-allowed bg-[#d9d9d9]',
      )}
    >
      <div className="flex flex-col gap-8 rounded-lg border border-gray-200 p-4">
        <div className="flex flex-row items-center justify-between gap-1">
          <span className="text-title-smaller text-lg font-bold">{team.name}</span>
          <span className="text-lighter-gray">{team.date}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">시간</span>
              <span className="text-lighter-gray">
                {team.startAt} ~ {team.endAt}
              </span>
            </div>
            {teamLeader && user?.id === teamLeader.id && (
              <span className="text-mountain_meadow font-bold">팀장</span>
            )}
          </div>
          <div className="flex w-full flex-row justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">장소</span>
              <span className="text-lighter-gray">{team.address.sigungu}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-title-smaller">인원</span>
              <span className="text-lighter-gray">
                {team.users.length} / {team.maxMemberCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default TeamCard
