import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallengesTeams = (challengeId: number | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.challenges.teams(challengeId).queryKey,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => challengesApi.getChallengesTeams(challengeId!),
    enabled: challengeId != null,
  })
}

export default useChallengesTeams
