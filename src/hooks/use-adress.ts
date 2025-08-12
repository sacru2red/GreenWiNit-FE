import { addressApi } from '@/api/address'
import { useQuery } from '@tanstack/react-query'

const MINUTES = 60 * 1000

const useAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: addressApi.getAddress,
    staleTime: 2 * MINUTES,
    retry: false,
  })
}

export default useAddress
