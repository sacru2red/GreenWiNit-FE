import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const mockProducts: Product[] = [
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
]

export type Product = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
  sellingStatus: string
}

interface ProductApiResponse<T> {
  success: boolean
  message: string
  result: {
    hasNext: boolean
    nextCursor?: number | undefined
    content: T
  }
}

interface ProductMockingState {
  products: Product[]
  getProducts: () => ProductApiResponse<Product[]>
  getProduct: (productId: number) => ProductApiResponse<Product>
}

export const productMocking = create<ProductMockingState>()(
  devtools(
    persist(
      (set, get) => ({
        products: mockProducts,
        getProducts: () => {
          const { products } = get()
          set((state) => state) // eslint 오류 해결
          return {
            success: true,
            message: '상품 조회 성공',
            result: {
              hasNext: false,
              nextCursor: undefined,
              content: products,
            },
          }
        },

        getProduct: (productId: number) => {
          const { products } = get()
          const product = products.find((p: Product) => p.pointProductId === productId)

          if (!product) {
            return {
              success: false,
              message: '상품을 찾을 수 없습니다.',
              result: {
                hasNext: false,
                nextCursor: undefined,
                content: {} as Product,
              },
            }
          }

          return {
            success: true,
            message: '특정 상품을 조회 성공하였습니다.',
            result: {
              hasNext: true,
              nextCursor: undefined,
              content: product,
            },
          }
        },
      }),
      {
        name: 'product-mocking-store',
      },
    ),
  ),
)
