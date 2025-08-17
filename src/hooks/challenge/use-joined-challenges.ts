import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { ChallengeType } from '@/types/challenge'

export const useJoinedChallenges = () => {
  const [challengeType, setChallengeType] = useState<ChallengeType>('individual')

  const queryKey = challengesQueryKeys.challenges.listJoinedMine({
    challengeType,
  }).queryKey

  const queryFn = () =>
    challengesApi.getJoinedChallengesMine({
      challengeType,
      cursor: null,
    })

  const queryResult = useQuery({
    queryKey,
    queryFn,
  })

  return {
    ...queryResult,
    challengeType,
    setChallengeType,
  }
}
