import { addressApi } from '@/api/addresses'
import { useQuery } from '@tanstack/react-query'

const useAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: addressApi.getAddress,
    retry: false,
  })
}

export default useAddress
