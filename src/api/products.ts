import { createQueryKeys } from '@lukemorales/query-key-factory'

export type ServerProduct = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
  sellingStatus: string
}

export type Product = {
  id: number
  name: string
  thumbnailUrl: string
  price: number
  sellingStatus: string
}

export const mapServerProductToClient = (serverProduct: ServerProduct): Product => {
  return {
    id: serverProduct.pointProductId,
    name: serverProduct.pointProductName,
    thumbnailUrl: serverProduct.thumbnailUrl,
    price: serverProduct.pointPrice,
    sellingStatus: serverProduct.sellingStatus,
  }
}

export const mapServerProductsToClient = (serverProducts: ServerProduct[]): Product[] => {
  return serverProducts.map(mapServerProductToClient)
}

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch('/api/v1/point-products')
    const data = await response.json()

    return mapServerProductsToClient(data.result.content)
  },

  getProduct: async (productId: string | undefined): Promise<Product> => {
    const response = await fetch(`/api/v1/point-products/${productId}`)
    const data = await response.json()

    return mapServerProductToClient(data.result)
  },
}

const productsKey = createQueryKeys('products', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const productQueryKeys = productsKey
