import { AddressState } from '@/components/common/form/address-input'

export type ServerAddress = {
  recipientName: string
  phoneNumber: string
  roadAddress: string
  detailAddress: string
  zipCode: string
}

export type ClientAddress = {
  name: string
  phone: string
  address: AddressState | null
}
