import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'

export const useCertifiedChallenges = () => {
  const [challengeType, setChallengeType] = useState<0 | 1>(0)
  const challengeTypeString = challengeType === 0 ? 'individual' : 'team'

  const queryKey = challengesQueryKeys.challenges.listCertifiedMine({
    challengeType: challengeTypeString,
  }).queryKey

  const queryFn = () =>
    challengesApi.getCertifiedChallengesMine({
      challengeType: challengeTypeString,
      cursor: null,
    })

  const queryResult = useQuery({
    queryKey,
    queryFn,
    retry: false,
  })

  return {
    ...queryResult,
    challengeType,
    setChallengeType,
    challengeTypeString,
  }
}
