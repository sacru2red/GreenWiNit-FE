import ProfileIcon from '@/components/common/profile-icon'
import useChallenge from '@/hooks/challenge/use-challenge'
import { ChallengeType } from '@/types/challenge'

interface ChallengeTitleProps {
  challengeId?: number
  challengeType: ChallengeType
}

const ChallengeTitle = ({ challengeId, challengeType }: ChallengeTitleProps) => {
  const { data: challenge } = useChallenge({ id: challengeId, type: challengeType })

  return (
    <div className="flex flex-row items-center justify-start gap-1.5">
      <ProfileIcon size="small" className="border-none bg-transparent" />
      <h2 className="truncate text-xl font-bold">{challenge?.challengeName}</h2>
    </div>
  )
}

export default ChallengeTitle
