import { informationQueryKeys, informationsApi } from '@/api/informations'
import { useQuery } from '@tanstack/react-query'

export const useInformations = () => {
  return useQuery({
    queryKey: informationQueryKeys.list().queryKey,
    queryFn: informationsApi.getInformations,
  })
}
