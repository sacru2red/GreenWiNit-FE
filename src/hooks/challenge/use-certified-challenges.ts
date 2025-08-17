import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { ChallengeType } from '@/types/challenge'

export const useCertifiedChallenges = () => {
  const [challengeType, setChallengeType] = useState<ChallengeType>('individual')

  const queryKey = challengesQueryKeys.challenges.listCertifiedMine({
    challengeType,
  }).queryKey

  const queryFn = () =>
    challengesApi.getCertifiedChallengesMine({
      challengeType,
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
  }
}
