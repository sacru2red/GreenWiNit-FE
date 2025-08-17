import { useNavigate } from '@tanstack/react-router'
import { useJoinedChallenges } from '@/hooks/challenge/use-joined-challenges'
import FilteredChallengesDisplay from '@/components/filtered-challenges-display'

function JoinedChallengesContainer() {
  const navigate = useNavigate()
  const { challengeType, setChallengeType, data } = useJoinedChallenges()
  const challenges = data?.result?.content

  const handleNavigate = (challengeId: number) => {
    if (challengeType === 'individual') {
      return navigate({ to: `/challenges/${challengeId}/submit/individual` })
    }
    return navigate({ to: `/challenges/${challengeId}/teams` })
  }

  return (
    <FilteredChallengesDisplay
      challengeType={challengeType}
      setChallengeType={setChallengeType}
      challenges={challenges ?? []}
      handleNavigate={handleNavigate}
    />
  )
}

export default JoinedChallengesContainer
