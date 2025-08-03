import { AddressState } from '@/components/common/form/address-input'

export type AddressForm = {
  name: string
  phone: string
  address: AddressState
}

export type ServerAddress = {
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

export type ClientAddress = {
  id: number
  name: string
  phone: string
  address: AddressState
}

export type ClientAddressForm = Omit<ClientAddress, 'id'>
