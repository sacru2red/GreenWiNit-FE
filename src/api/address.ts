import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { serverToClientAddress } from '@/lib/utils'
import { ClientAddress, ServerAddress, UpdateAddressDto } from '@/types/addresses'

export const addressApi = {
  getAddress: async () => {
    return await fetch(`${API_URL}/deliveries/addresses`)
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ServerAddress>)
      .then((data) => serverToClientAddress(data))
  },
  updateAddress: async (id: number, body: Partial<ClientAddress>) => {
    return await fetch(`${API_URL}/deliveries/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ServerAddress>)
      .then((data) => serverToClientAddress(data))
  },
  saveAddress: async (data: UpdateAddressDto) => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ServerAddress>)
      .then((data) => serverToClientAddress(data))
  },
}

export const clientToServerAddress = (
  clientAddress: ClientAddress,
  id: number,
): ServerAddress | null => {
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
