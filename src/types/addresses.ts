import { AddressState } from '@/components/common/form/address-input'

export type ServerAddress = {
  deliveryAddressId: number
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type AddressDto = Omit<ServerAddress, 'deliveryAddressId'>

export type ClientAddress = {
  id: number
  name: string
  phone: string
  address: AddressState | null
}

export type ClientAddressForm = Omit<ClientAddress, 'id'>
