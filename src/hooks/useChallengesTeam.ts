import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallengesTeam = (challengeId: string | undefined, teamId: string | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.team(challengeId, teamId).queryKey,
    queryFn: () => challengesApi.getChallengesTeam(challengeId, teamId),
  })
}

export default useChallengesTeam
