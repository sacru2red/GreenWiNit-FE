import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useQuery } from '@tanstack/react-query'

const useChallenge = (id: number | undefined) => {
  return useQuery({
    queryKey: challengesQueryKeys.challenges.detail(id).queryKey,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => challengesApi.getChallengeDetail(id!),
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
