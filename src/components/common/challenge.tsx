import { CertifiedChallenges, ChallengeFoo as ChallengeType } from '@/api/challenges'
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
  console.log('challenge', challenge)

  const view =
    'challengeName' in challenge
      ? {
          title: challenge.challengeName,
          image: challenge.challengeImage || DEFAULT_CHALLENGE_IMAGE,
          subText: `${dayjs(challenge.beginDate).format('YY.MM.DD')} ~ ${dayjs(challenge.endDate).format('MM.DD')}`,
        }
      : {
          title: challenge.challengeTitle,
          image: challenge.certificationImageUrl || DEFAULT_CHALLENGE_IMAGE,
          subText: dayjs(challenge.certifiedDate).format('YY.MM.DD'),
        }

  return (
    <div
      className={cn(
        'flex flex-1 basis-[164px] flex-col overflow-hidden rounded-xl bg-white shadow-lg',
        onClick ? 'cursor-pointer' : null,
        className,
      )}
      onClick={onClick}
    >
      <img className="h-22 w-full object-contain" src={view.image} />
      <div className="flex flex-col gap-1 p-3 text-start">
        <span className="text-title-smaller overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap">
          {view.title}
        </span>
        <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap text-[#737373]">
          {view.subText}
        </span>
      </div>
    </div>
  )
}

export default Challenge
