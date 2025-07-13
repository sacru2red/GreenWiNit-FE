import { createQueryKeys } from '@lukemorales/query-key-factory'

export type Product = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
  sellingStatus: string
}

export const productsApi = {
  getProducts: async () => {
    const response = await fetch('/api/v1/point-products')
    const data = await response.json()
    return data.result.content
  },

  getProduct: async (productId: string | undefined) => {
    const response = await fetch(`/api/v1/point-products/${productId}`)
    const data = await response.json()
    return data.result.content
  },
}

const productsKey = createQueryKeys('products', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const productQueryKeys = productsKey
