import { AddressState } from '@/components/common/form/address-input'

export type AddressForm = {
  name: string
  phone: string
  address: AddressState
}

export type ServerAddress = {
  success: boolean
  message: string
  result: ServerAddressField
}

export type ServerAddressField = {
  deliveryAddressId: number
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type UpdateAddressDto = {
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

type Address = {
  roadAddress: string
  detailAddress: string
  zoneCode: string
}

export type ClientAddress = {
  id: number
  name: string
  phone: string
  address: Address
}

export type ClientAddressForm = Omit<ClientAddress, 'id'>
