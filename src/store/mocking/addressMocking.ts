import { serverToClientAddress } from '@/api/address'
import { ClientAddress, ServerAddress } from '@/types/addresses'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const initState: ServerAddress = {
  deliveryAddressId: 1,
  recipientName: '홍길동',
  phoneNumber: '010-1234-5678',
  roadAddress: '00시 00구 00로 11',
  detailAddress: '1층',
  zipCode: '12345',
}

const clientMockAddress = serverToClientAddress(initState)

interface AddressStore {
  address: ClientAddress
  getAddress: () => ClientAddress | null
  enrollAddress: (newAddress: ClientAddress) => void
  updateAddress: (updatedAddress: Partial<ClientAddress>) => void
}

export const addressMockingStore = create<AddressStore>()(
  devtools(
    persist(
      (set, get) => ({
        address: clientMockAddress,
        getAddress: (): ClientAddress | null => {
          return get().address
        },
        enrollAddress: (newAddress: ClientAddress) => {
          set({ address: newAddress })
        },

        updateAddress: (updatedAddress: Partial<ClientAddress>) => {
          const currentAddress = get().address
          const newAddress = {
            ...currentAddress,
            ...updatedAddress,
            address: updatedAddress.address
              ? { ...currentAddress.address, ...updatedAddress.address }
              : currentAddress.address,
          }

          set({ address: newAddress })
        },
      }),
      {
        name: 'address-storage',
      },
    ),
  ),
)
