import LogoIcon from '@/components/common/logo-icon'
import useChallenge from '@/hooks/challenge/use-challenge'

interface ChallengeTitleProps {
  challengeId?: number
}

const ChallengeTitle = ({ challengeId }: ChallengeTitleProps) => {
  const { data: challenge } = useChallenge(challengeId)

  return (
    <div className="flex flex-row items-center justify-start gap-1.5">
      <LogoIcon size="small" className="border-none bg-transparent" />
      <h2 className="text-xl font-bold">{challenge?.title}</h2>
    </div>
  )
}

export default ChallengeTitle
