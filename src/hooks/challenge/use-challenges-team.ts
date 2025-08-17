import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallengesTeam = (teamId: number | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.challenges.team(teamId).queryKey,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => challengesApi.getChallengesTeam(teamId!),
    enabled: teamId != null,
  })
}

export default useChallengesTeam
