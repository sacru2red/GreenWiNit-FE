import { createQueryKeys } from '@lukemorales/query-key-factory'

export type Product = {
  id: number
  name: string
  thumbnailUrl: string
  price: number
  sellingStatus: string
}

export const productsApi = {
  getProducts: async () => {
    const response = await fetch('/api/v1/point-products')
    const data = await response.json()
    return data.result.content as Promise<Product[]>
  },

  getProduct: async (productId: string | undefined) => {
    const response = await fetch(`/api/v1/point-products/${productId}`)
    const data = await response.json()
    return data.result as Promise<Product>
  },
}

const productsKey = createQueryKeys('products', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const productQueryKeys = productsKey
