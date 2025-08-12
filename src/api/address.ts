import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { serverToClientAddress } from '@/lib/utils'
import { ClientAddress, ServerAddress, UpdateAddressDto } from '@/types/addresses'

export const addressApi = {
  getAddress: async () => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ServerAddress>)
      .then((data) => serverToClientAddress(data))
  },
}
