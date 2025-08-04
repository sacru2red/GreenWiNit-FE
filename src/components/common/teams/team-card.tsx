import { ChallengeTeamsElement } from '@/api/challenges'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

interface TeamCardProps {
  team: ChallengeTeamsElement
  onClick?: () => void
}

const TeamCard = ({ team, onClick }: TeamCardProps) => {
  const isJoinAllowed = team.groupStatus === 'RECRUITING'

  return (
    <button
      onClick={onClick}
      disabled={!isJoinAllowed}
      className={cn(
        'overflow-hidden rounded-lg bg-white',
        !isJoinAllowed && '!cursor-not-allowed bg-[#d9d9d9]',
      )}
    >
      <div className="flex flex-col gap-8 rounded-lg border border-gray-200 p-4">
        <div className="flex flex-row items-center justify-between gap-1">
          <span className="text-title-smaller text-lg font-bold">{team.groupName}</span>
          <span className="text-lighter-gray">
            {dayjs(team.groupBeginDateTime).format('YYYY.MM.DD')}
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">시간</span>
              <span className="text-lighter-gray">
                {dayjs(team.groupBeginDateTime).format('HH:mm')} ~{' '}
                {dayjs(team.groupEndDateTime).format('HH:mm')}
              </span>
            </div>
            {team.isLeader && <span className="text-mountain_meadow font-bold">팀장</span>}
          </div>
          <div className="flex w-full flex-row justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">장소</span>
              <span className="text-lighter-gray">{team.groupAddress}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-title-smaller">인원</span>
              <span className="text-lighter-gray">
                {team.currentParticipants} / {team.maxParticipants}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default TeamCard
