import { AddressState } from '@/components/common/form/address-input'

export type ServerAddress = {
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type GetServerAddress = ServerAddress & {
  deliveryAddressId: number
}

export type ClientAddress = {
  id: number | null
  name: string
  phone: string
  address: AddressState | null
}
