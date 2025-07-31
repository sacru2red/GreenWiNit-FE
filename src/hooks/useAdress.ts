import { addressApi } from '@/api/address'
import { useQuery } from '@tanstack/react-query'

const MINUTES = 60 * 1000

const useAddress = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAddress,
    staleTime: 5 * MINUTES,
  })
}

export default useAddress
