import { create } from 'zustand'
import { Product } from './productMocking'
import { devtools } from 'zustand/middleware'

type ProdcutDetailType = Product & {
  description: string
  stockQuantity: number
}

export const mockDetailProducts: ProdcutDetailType[] = [
  {
    pointProductId: 1,
    pointProductName: '에코 텀블러',
    thumbnailUrl: '/img/2.png',
    pointPrice: 1200,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 2,
    pointProductName: '에코 백',
    thumbnailUrl: '/img/2.png',
    pointPrice: 850,
    sellingStatus: '품절',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 3,
    pointProductName: '대나무 칫솔 세트',
    thumbnailUrl: '/img/2.png',
    pointPrice: 600,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 4,
    pointProductName: '재사용 빨대 세트',
    thumbnailUrl: '/img/2.png',
    pointPrice: 450,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 5,
    pointProductName: '친환경 노트',
    thumbnailUrl: '/img/2.png',
    pointPrice: 300,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 6,
    pointProductName: '유리 물병',
    thumbnailUrl: '/img/2.png',
    pointPrice: 1500,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 7,
    pointProductName: '대나무 도시락',
    thumbnailUrl: '/img/2.png',
    pointPrice: 2000,
    sellingStatus: '품절',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
  {
    pointProductId: 8,
    pointProductName: '친환경 세제',
    thumbnailUrl: '/img/2.png',
    pointPrice: 800,
    sellingStatus: '교환가능',
    description:
      '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
    stockQuantity: 0,
  },
]

interface ProductDetailApiResponse {
  success: boolean
  message: string
  result: ProdcutDetailType | null
}

interface ProdcutDetailStore {
  detailProduct: ProdcutDetailType[]
  getProductDetail: (productId: number) => ProductDetailApiResponse
}

export const ProdcutDetailMocking = create<ProdcutDetailStore>()(
  devtools(
    () => ({
      detailProduct: mockDetailProducts,
      getProductDetail: (productId: number): ProductDetailApiResponse => {
        const findProduct = mockDetailProducts.find(
          (product) => product.pointProductId === productId,
        )
        if (findProduct) {
          return {
            success: true,
            message: '제품 상세정보를 조회 성공하였습니다.',
            result: findProduct,
          }
        }

        return {
          success: false,
          message: '해당 상품을 찾을 수 없습니다.',
          result: null,
        }
      },
    }),
    {
      name: 'product-detail-store',
    },
  ),
)
