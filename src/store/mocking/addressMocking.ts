import { serverToClientAddress } from '@/api/address'
import { AddressInfoApiResponse, ClientAddressInfo, ServerAddressInfo } from '@/types/addresses'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const mockAddressInfo: ServerAddressInfo[] = [
  {
    deliveryAddressId: 1,
    recipientName: '홍길동',
    phoneNumber: '010-1234-5678',
    roadAddress: '00시 00구 00로 11',
    detailAddress: '1층',
    zipCode: '12345',
  },
]

const clientMockAddress = mockAddressInfo[0] ? serverToClientAddress(mockAddressInfo[0]) : null

interface AddressInfoStore {
  addressInfo: ClientAddressInfo
  enrollAddress: (newAddress: ClientAddressInfo) => AddressInfoApiResponse
  updateAddress: (updatedAddress: Partial<ClientAddressInfo>) => AddressInfoApiResponse
}

export const addressMocking = create<AddressInfoStore>()(
  devtools(
    persist(
      (set, get) => ({
        addressInfo: clientMockAddress,

        enrollAddress: (newAddress: ClientAddressInfo): AddressInfoApiResponse => {
          set({ addressInfo: newAddress })

          return {
            success: true,
            message: '주소가 성공적으로 등록되었습니다.',
            result: newAddress,
          }
        },

        updateAddress: (updatedAddress: Partial<ClientAddressInfo>): AddressInfoApiResponse => {
          const currentAddress = get().addressInfo
          const newAddress = {
            ...currentAddress,
            ...updatedAddress,
            address: updatedAddress.address
              ? { ...currentAddress.address, ...updatedAddress.address }
              : currentAddress.address,
          }

          set({ addressInfo: newAddress })

          return {
            success: true,
            message: '주소가 성공적으로 업데이트되었습니다.',
            result: newAddress,
          }
        },
      }),
      {
        name: 'address-storage',
      },
    ),
  ),
)
