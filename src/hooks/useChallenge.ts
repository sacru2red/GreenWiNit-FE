import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallenge = (id: string | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.detail(id).queryKey,
    queryFn: () => challengesApi.getChallengeDetail(id),
  })
}

export default useChallenge
