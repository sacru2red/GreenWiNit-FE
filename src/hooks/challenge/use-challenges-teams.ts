import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallengesTeams = (apiParams: {
  challengeId: number | undefined
  cursor?: number | null
  pageSize?: number | null
}) => {
  const { challengeId, cursor, pageSize } = apiParams
  return useQuery({
    queryKey: challengesQueryKeys.challenges.teams({
      challengeId,
      cursor,
      pageSize,
    }).queryKey,
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      challengesApi.getChallengesTeams({ challengeId: challengeId!, cursor, pageSize }),
    enabled: challengeId != null,
  })
}

export default useChallengesTeams
