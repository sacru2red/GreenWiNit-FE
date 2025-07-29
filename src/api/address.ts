import { AddressState } from '@/components/common/form/AddressInput'
import { API_URL } from '@/constant/network'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export type ServerAddressInfo = {
  deliveryAddressId: number
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type ClientAddressInfo = {
  id: number
  name: string
  phone: string
  address: AddressState
}

export interface AddressInfoApiResponse {
  success: boolean
  message: string
  result: ClientAddressInfo | null
}

export const serverToClientAddress = (serverAddress: ServerAddressInfo): ClientAddressInfo => {
  return {
    id: serverAddress.deliveryAddressId,
    name: serverAddress.recipientName,
    phone: serverAddress.phoneNumber,
    address: {
      roadAddress: serverAddress.roadAddress,
      roadnameCode: '',
      zonecode: serverAddress.zipCode,
      detailAddress: serverAddress.detailAddress,
      sigungu: '',
    },
  }
}

export const clientToServerAddress = (
  clientAddress: ClientAddressInfo,
  id: number,
): ServerAddressInfo | null => {
  if (!clientAddress.address) {
    return null
  }

  return {
    deliveryAddressId: id,
    recipientName: clientAddress.name,
    phoneNumber: clientAddress.phone,
    roadAddress: clientAddress.address.roadAddress,
    detailAddress: clientAddress.address.detailAddress,
    zipCode: clientAddress.address.zonecode,
  }
}

export const addressApi = {
  getAddress: async (): Promise<ClientAddressInfo> => {
    const response = await fetch(`${API_URL}/deliveries/addresses`)
    const data = await response.json()

    return serverToClientAddress(data)
  },
  updateAddress: async (
    id: number,
    body: Partial<ClientAddressInfo>,
  ): Promise<ClientAddressInfo> => {
    const response = await fetch(`/api/v1/deliveries/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`STATUS: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data) {
      throw new Error('no data')
    }

    return serverToClientAddress(data)
  },
}

export const addressQuerykey = createQueryKeys('address', {
  detail: () => ['address'] as const,
})
