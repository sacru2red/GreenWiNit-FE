import LogoIcon from '@/components/common/logo-icon'
import useChallenge from '@/hooks/challenge/use-challenge'

interface ChallengeTitleProps {
  challengeId?: number
  challengeType: 'individual' | 'team'
}

const ChallengeTitle = ({ challengeId, challengeType }: ChallengeTitleProps) => {
  const { data: challenge } = useChallenge({ id: challengeId, type: challengeType })

  return (
    <div className="flex flex-row items-center justify-start gap-1.5">
      <LogoIcon size="small" className="border-none bg-transparent" />
      <h2 className="text-xl font-bold">{challenge?.title}</h2>
    </div>
  )
}

export default ChallengeTitle
