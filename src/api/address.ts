import { AddressState } from '@/components/common/form/AddressInput'

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
    const response = await fetch(`api/v1/deliveries/addresses`)
    const data = await response.json()

    return serverToClientAddress(data)
  },
  updateAddress: async (body: Partial<ClientAddressInfo>): Promise<ClientAddressInfo> => {
    const response = await fetch(`api/vi/deliveries/addresses`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await response.json()

    return serverToClientAddress(data)
  },
}
