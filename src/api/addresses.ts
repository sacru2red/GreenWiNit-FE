import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { serverToClientAddress } from '@/lib/utils'
import { GetServerAddress, ServerAddress } from '@/types/addresses'
import { ApiResponse } from '@/types/api'

export const addressApi = {
  getAddress: async () => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<GetAddressResponse>)
      .then((res) => {
        if (res.success) {
          return res.result
        }
        throw new Error(res.message)
      })
      .then((data) => serverToClientAddress(data))
  },
  updateAddress: async (body: AddressUpdateDto) => {
    return await fetch(`${API_URL}/deliveries/addresses/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<AddressResponse>)
      .then((res) => {
        if (res.success) {
          return res.result
        }
        throw new Error(res.message)
      })
  },
  saveAddress: async (data: AddressCreateDto) => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<AddressResponse>)
      .then((res) => {
        if (res.success) {
          return res.result
        }
        throw new Error(res.message)
      })
  },
}

type GetAddressResponse = ApiResponse<GetServerAddress>
type AddressResponse = ApiResponse<ServerAddress>
type AddressCreateDto = ServerAddress
type AddressUpdateDto = ServerAddress
