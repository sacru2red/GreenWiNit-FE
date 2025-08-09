import { CertifiedChallenges, Challenge as ChallengeType } from '@/api/challenges'
import { cn } from '@/lib/utils'
import { MouseEventHandler } from 'react'
import dayjs from 'dayjs'
import { DEFAULT_CHALLENGE_IMAGE } from '@/constant/challenge'

interface ChallengeProps {
  challenge: ChallengeType | CertifiedChallenges
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

const Challenge = ({ challenge, onClick, className }: ChallengeProps) => {
  const isJoinedChallenge = 'beginDateTime' in challenge

  return (
    <div
      className={cn(
        'flex flex-1 basis-[160px] flex-col overflow-hidden rounded-xl bg-white shadow-lg',
        onClick ? 'cursor-pointer' : '',
        className,
      )}
      onClick={onClick}
    >
      <img
        className="w-full"
        src={
          isJoinedChallenge
            ? challenge.challengeImage
            : challenge.certificationImageUrl || DEFAULT_CHALLENGE_IMAGE
        }
      />
      <div className="flex flex-col gap-1 p-3 text-start">
        <span className="text-title-smaller overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap">
          {isJoinedChallenge ? challenge.challengeName : challenge.challengeTitle}
        </span>
        <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-[#737373]">
          {/* @NOTE: 해를 넘어가는 경우에 표기방법 고민 필요 */}
          {isJoinedChallenge
            ? `${dayjs(challenge.beginDateTime).format('YY.MM.DD')} ~ ${dayjs(challenge.endDateTime).format('MM.DD')}`
            : dayjs(challenge.certifiedDate).format('YY.MM.DD')}
        </span>
      </div>
    </div>
  )
}

export default Challenge
