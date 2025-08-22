import { ChallengeTeamsCommonElement } from '@/api/challenges'
import { cn } from '@/lib/utils'
import { dayjs } from '@/constant/globals'

interface TeamCardProps<T extends ChallengeTeamsCommonElement> {
  team: T
  onClick?: () => void
  forceEnableButton?: boolean
  isCertified?: boolean
}

const TeamCard = <T extends ChallengeTeamsCommonElement>({
  team,
  onClick,
  forceEnableButton,
  isCertified,
}: TeamCardProps<T>) => {
  const challengeDateDayjs = dayjs(team.challengeDate)
  const startTimeDayjs = dayjs(team.startTime, 'HH:mm:ss')
    .year(challengeDateDayjs.year())
    .month(challengeDateDayjs.month())
    .date(challengeDateDayjs.date())
  const startTimeIsBeforeNow = dayjs().isBefore(startTimeDayjs)
  const enableButton =
    (team.maxParticipants >= team.currentParticipants && startTimeIsBeforeNow) ||
    ('leaderMe' in team && team.leaderMe) ||
    forceEnableButton

  return (
    <button
      onClick={onClick}
      disabled={!enableButton}
      className={cn(
        'overflow-hidden rounded-lg bg-white shadow-md',
        !enableButton && '!cursor-not-allowed bg-[#d9d9d9]',
      )}
    >
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
        <div className="flex w-full flex-col items-center justify-between">
          <div className="flex w-full flex-row items-center justify-between gap-1">
            <span className="text-title-smaller truncate text-lg font-bold">{team.groupName}</span>
            <span className="text-lighter-gray">
              {dayjs(team.challengeDate).format('YYYY.MM.DD')}
            </span>
          </div>
          {isCertified && <span className="self-end font-bold text-red-600">인증완료</span>}
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">시간</span>
              <span className="text-lighter-gray">
                {dayjs(team.startTime, 'HH:mm:ss').format('HH:mm')} ~{' '}
                {dayjs(team.endTime, 'HH:mm:ss').format('HH:mm')}
              </span>
            </div>
            {'leaderMe' in team && team.leaderMe ? (
              <span className="text-mountain_meadow font-bold">팀장</span>
            ) : null}
          </div>
          <div className="flex w-full flex-row justify-between gap-2">
            <div className="flex gap-2">
              <span className="text-title-smaller">장소</span>
              <span className="text-lighter-gray">{team.sigungu}</span>
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
