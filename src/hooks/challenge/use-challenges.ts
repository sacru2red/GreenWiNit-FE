import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { ChallengeType } from '@/types/challenge'
import { useQuery } from '@tanstack/react-query'

export const useChallenges = (apiParams: {
  challengeType: ChallengeType
  cursor?: number | null
  pageSize?: number
}) => {
  const { challengeType, cursor, pageSize } = apiParams

  return useQuery({
    queryKey: challengesQueryKeys.challenges.list({
      challengeType,
      cursor: cursor ?? null,
      pageSize,
    }).queryKey,
    queryFn: (ctx) => {
      const [
        ,
        ,
        challengeTypeFromQueryKey,
        ,
        { cursor: cursorFromQueryKey, pageSize: pageSizeFromQueryKey },
      ] = ctx.queryKey

      if (challengeTypeFromQueryKey === 'individual') {
        return challengesApi.getIndividualChallenges({
          cursor: cursorFromQueryKey,
          pageSize: pageSizeFromQueryKey,
        })
      }

      return challengesApi.getTeamChallenges({
        cursor: cursorFromQueryKey,
        pageSize: pageSizeFromQueryKey,
      })
    },
    select: (data) => {
      if (data.success) {
        return data.result.content
      }

      return null
    },
  })
}
