import { addressApi, ClientAddressInfo } from '@/api/address'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export interface UpdateAddressRequest extends Partial<ClientAddressInfo> {
  deliveryAddressId: number
}

export const useUpdateAddress = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<ClientAddressInfo, Error, UpdateAddressRequest>({
    mutationFn: ({ deliveryAddressId, ...addressData }) =>
      addressApi.updateAddress(deliveryAddressId, addressData),
    onSuccess: (updatedAddress) => {
      queryClient.setQueryData(['address'], updatedAddress)
      navigate(-1)
    },
    onError: (error) => {
      console.error('주소 업데이트 실패:', error)
    },
  })
}
