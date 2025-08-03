import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ClientAddress } from '@/types/addresses'
import { serverToClientAddress } from '@/lib/utils'
import { ProdcutDetailType, Product } from '@/types/product'

/**
 * 이 파일은 추후에 삭제되어야 합니다.
 */

interface ApiServerMockingState {
  address: ClientAddress
  getAddress: () => ClientAddress | null
  enrollAddress: (newAddress: ClientAddress) => void
  updateAddress: (updatedAddress: Partial<ClientAddress>) => void

  products: Product[]
  getProducts: () => Product[]
  detailProduct: ProdcutDetailType[]
  getProductDetail: (productId: number) => ProdcutDetailType | undefined
}

export const apiServerMockingStore = create<ApiServerMockingState>()(
  devtools(
    persist(
      (set, get) => ({
        address: serverToClientAddress({
          deliveryAddressId: 1,
          recipientName: '홍길동',
          phoneNumber: '010-1234-5678',
          roadAddress: '00시 00구 00로 11',
          detailAddress: '1층',
          zipCode: '12345',
        }),
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

        products: [
          {
            pointProductId: 1,
            pointProductName: '에코 텀블러',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1200,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 2,
            pointProductName: '에코 백',
            thumbnailUrl: '/img/2.png',
            pointPrice: 850,
            sellingStatus: '품절',
          },
          {
            pointProductId: 3,
            pointProductName: '대나무 칫솔 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 600,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 4,
            pointProductName: '재사용 빨대 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 450,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 5,
            pointProductName: '친환경 노트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 300,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 6,
            pointProductName: '유리 물병',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1500,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 7,
            pointProductName: '대나무 도시락',
            thumbnailUrl: '/img/2.png',
            pointPrice: 2000,
            sellingStatus: '품절',
          },
          {
            pointProductId: 8,
            pointProductName: '친환경 세제',
            thumbnailUrl: '/img/2.png',
            pointPrice: 800,
            sellingStatus: '교환가능',
          },
        ],
        getProducts: () => {
          return get().products
        },
        detailProduct: [
          {
            pointProductId: 1,
            pointProductName: '에코 텀블러',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1200,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 5,
          },
          {
            pointProductId: 2,
            pointProductName: '에코 백',
            thumbnailUrl: '/img/2.png',
            pointPrice: 850,
            sellingStatus: '품절',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 3,
          },
          {
            pointProductId: 3,
            pointProductName: '대나무 칫솔 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 600,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 12,
          },
          {
            pointProductId: 4,
            pointProductName: '재사용 빨대 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 450,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 11,
          },
          {
            pointProductId: 5,
            pointProductName: '친환경 노트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 300,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 2,
          },
          {
            pointProductId: 6,
            pointProductName: '유리 물병',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1500,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 5,
          },
          {
            pointProductId: 7,
            pointProductName: '대나무 도시락',
            thumbnailUrl: '/img/2.png',
            pointPrice: 2000,
            sellingStatus: '품절',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 8,
          },
          {
            pointProductId: 8,
            pointProductName: '친환경 세제',
            thumbnailUrl: '/img/2.png',
            pointPrice: 800,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 9,
          },
        ],
        getProductDetail: (productId: number) => {
          const findProduct = get().detailProduct.find(
            (product) => product.pointProductId === productId,
          )
          return findProduct
        },
      }),
      {
        name: 'apiServerMockingStore',
      },
    ),
  ),
)
