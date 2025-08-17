import { addressApi } from '@/api/address'
import { useQuery } from '@tanstack/react-query'

const useAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: addressApi.getAddress,
    retry: false,
  })
}

export default useAddress
