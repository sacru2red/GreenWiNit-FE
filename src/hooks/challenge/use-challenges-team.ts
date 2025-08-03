import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallengesTeam = (challengeId: number | undefined, teamId: string | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.challenges.team(challengeId, teamId).queryKey,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => challengesApi.getChallengesTeam(challengeId!, teamId!),
    enabled: challengeId != null && teamId != null,
  })
}

export default useChallengesTeam
