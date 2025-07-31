import { API_URL } from '@/constant/network'
import { ClientAddressInfo, ServerAddressInfo, ServerPostAddress } from '@/types/addresses'

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
  saveAddress: async (data: ServerPostAddress) => {
    try {
      const response = await fetch(`/api/v1/deliveries/addresses`, {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`응답 오류: ${response.status} ${response.statusText}`)
      }

      return true
    } catch (error) {
      throw new Error(`배송지 정보를 저장하는데 실패하였습니다: ${error}`)
    }
  },
}
