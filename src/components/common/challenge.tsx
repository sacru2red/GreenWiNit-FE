import { CommonChallenge, GetCertifiedChallengesMineElement } from '@/api/challenges'
import { cn } from '@/lib/utils'
import { MouseEventHandler } from 'react'
import dayjs from 'dayjs'
import { DEFAULT_CHALLENGE_IMAGE } from '@/constant/challenge'

interface ChallengeProps {
  challenge: CommonChallenge | GetCertifiedChallengesMineElement
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}

const Challenge = ({ challenge, onClick, className }: ChallengeProps) => {
  const view = {
    title: challenge.challengeName,
    image: challenge.challengeImage,
    subText:
      'beginDate' in challenge
        ? `${dayjs(challenge.beginDate).format('YY.MM.DD')} ~ ${dayjs(challenge.endDate).format('MM.DD')}`
        : dayjs(challenge.certifiedDate).format('YY.MM.DD'),
  }

  return (
    <div
      className={cn(
        'border-lighter-gray-border flex flex-1 basis-[164px] flex-col overflow-hidden rounded-xl border bg-white',
        onClick ? 'cursor-pointer' : null,
        className,
      )}
      onClick={onClick}
    >
      <img className="h-22 w-full object-contain" src={view.image || DEFAULT_CHALLENGE_IMAGE} />
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
