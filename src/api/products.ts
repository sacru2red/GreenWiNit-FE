import { API_URL } from '@/constant/network'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

export type ServerProducts = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
  /**
   * 교환가능
   */
  sellingStatus: string
}

export type Products = {
  id: number
  name: string
  thumbnailUrl: string
  price: number
  sellingStatus: string
}

export type ServerProductDetail = {
  pointProductId: number
  pointProductName: string
  description: string
  thumbnailUrl: string
  pointPrice: number
  stockQuantity: number
}

export type ProductDetail = {
  id: number
  name: string
  description: string
  thumbnailUrl: string
  price: number
  stockQuantity: number
}

export const mapServerProductToClient = (serverProduct: ServerProducts): Products => {
  return {
    id: serverProduct.pointProductId,
    name: serverProduct.pointProductName,
    thumbnailUrl: serverProduct.thumbnailUrl,
    price: serverProduct.pointPrice,
    sellingStatus: serverProduct.sellingStatus,
  }
}

export const mapServerProductsToClient = (serverProducts: ServerProducts[]): Products[] => {
  return serverProducts.map(mapServerProductToClient)
}

export const mapServerProductDetailToClient = (
  serverProduct: ServerProductDetail,
): ProductDetail => {
  return {
    id: serverProduct.pointProductId,
    name: serverProduct.pointProductName,
    description: serverProduct.description,
    thumbnailUrl: serverProduct.thumbnailUrl,
    price: serverProduct.pointPrice,
    stockQuantity: serverProduct.stockQuantity,
  }
}

export const mapServerProductsDetailToClient = (
  serverProducts: ServerProductDetail[],
): ProductDetail[] => {
  return serverProducts.map(mapServerProductDetailToClient)
}

export const productsApi = {
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/point-products`)

      if (!response.ok) {
        throw new Error(`API ERROR: ${response.status} ${response.statusText}`)
      }

      const apiServerResponse = (await response.json()) satisfies
        | {
            success: true
            message: 'string'
            result: {
              hasNext: boolean
              nextCursor: number | null
              content: ServerProducts[]
            }
          }
        | {
            success: false
            message: string
            result: null
          }

      return mapServerProductsToClient(apiServerResponse.result.content)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.')
    }
  },

  getProduct: async (productId: string | undefined) => {
    try {
      const response = await fetch(`${API_URL}/point-products/${productId}`)

      if (!response.ok) {
        throw new Error(`API ERROR : ${response.status} ${response.statusText}`)
      }

      const data = (await response.json()) satisfies
        | {
            success: true
            message: string
            result: ServerProductDetail
          }
        | {
            success: false
            message: string
            result: null
          }

      return mapServerProductDetailToClient(data.result)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.')
    }
  },
}

const productsKey = createQueryKeys('products', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const productQueryKeys = mergeQueryKeys(productsKey)
