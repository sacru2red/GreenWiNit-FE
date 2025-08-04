import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

export const useChallenges = (challengeType: 'individual' | 'team', cursor?: number | null) => {
  return useQuery({
    queryKey: challengesQueryKeys.challenges.list({
      challengeType,
      cursor: cursor ?? null,
    }).queryKey,
    queryFn: (ctx) => {
      const [, , , { challengeType, cursor: cursorFromQueryKey }] = ctx.queryKey

      if (challengeType === 'individual') {
        return challengesApi.getIndividualChallenges(cursorFromQueryKey)
      }

      return challengesApi.getTeamChallenges(cursorFromQueryKey)
    },
    select: (data) => {
      if (data.success) {
        return data.result.content
      }

      return null
    },
  })
}
