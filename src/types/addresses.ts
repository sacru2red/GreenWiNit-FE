import { AddressState } from '@/components/common/form/AddressInput'

export type AddressForm = {
  name: string
  phone: string
  address: AddressState
}

export type ServerAddressInfo = {
  deliveryAddressId: number
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type ServerPostAddress = Omit<ServerAddressInfo, 'deliveryAddressId'>

export type ClientAddressInfo = {
  id: number
  name: string
  phone: string
  address: AddressState
}

export type ClientAddressForm = Omit<ClientAddressInfo, 'id'>

export interface AddressInfoApiResponse {
  success: boolean
  message: string
  result: ClientAddressInfo | null
}
