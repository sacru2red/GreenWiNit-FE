import { informationQueryKeys, informationsApi } from '@/api/informations'
import { useQuery } from '@tanstack/react-query'

export const useInformation = (id: number | undefined) => {
  return useQuery({
    queryKey: informationQueryKeys.detail(id).queryKey,
    queryFn: () => informationsApi.getInformation(id),
  })
}
