import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallenge = (apiParams: { id: number | undefined; type: 'individual' | 'team' }) => {
  const { id, type } = apiParams

  return useQuery({
    queryKey: challengesQueryKeys.challenges.detail({ id, challengeType: type }).queryKey,
    queryFn: (ctx) => {
      const [, , challengeTypeFromQueryKey, { id: idFromQueryKey }] = ctx.queryKey
      if (challengeTypeFromQueryKey === 'individual') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return challengesApi.getIndividualChallengeDetail(idFromQueryKey!)
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return challengesApi.getTeamChallengeDetail(idFromQueryKey!)
    },
    enabled: id != null && !isNaN(id),
    select: (data) => {
      if (data.success) {
        return data.result
      }

      return null
    },
  })
}

export default useChallenge
