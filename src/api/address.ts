import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { serverToClientAddress } from '@/lib/utils'
import { AddressDto, ServerAddress } from '@/types/addresses'
import { BaseApiResponse } from '@/types/api'

export const addressApi = {
  getAddress: async () => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<AddressResponse>)
      .then((data) => serverToClientAddress(data.result))
  },
  updateAddress: async (body: AddressDto) => {
    return await fetch(`${API_URL}/deliveries/addresses/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<BaseResponse>)
  },
  saveAddress: async (data: AddressDto) => {
    return await fetch(`${API_URL}/deliveries/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<AddressResponse>)
  },
}

export type AddressResponse = BaseApiResponse<ServerAddress>

type BaseResponse = {
  success: boolean
  message: string
}
