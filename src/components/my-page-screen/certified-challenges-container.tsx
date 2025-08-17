import { useNavigate } from '@tanstack/react-router'
import FilteredChallengesDisplay from '@/components/filtered-challenges-display'
import { useCertifiedChallenges } from '@/hooks/challenge/use-certified-challenges'

function CertifiedChallengesContainer() {
  const navigate = useNavigate()
  const { challengeType, setChallengeType, data, isLoading } = useCertifiedChallenges()
  if (isLoading) return <div>데이터 불러오는 중...</div>

  const challenges = data?.result?.content
  if (!challenges) return <div>인증한 챌린지가 없습니다.</div>

  const handleNavigate = (challengeId: number) => {
    navigate({ to: `/my-page/challenges/certify/${challengeId}` })
  }

  return (
    <FilteredChallengesDisplay
      challengeType={challengeType}
      setChallengeType={setChallengeType}
      challenges={challenges}
      handleNavigate={handleNavigate}
    />
  )
}

export default CertifiedChallengesContainer
