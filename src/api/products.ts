import { createQueryKeys } from '@lukemorales/query-key-factory'

export type ServerProducts = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
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
  getProducts: async (): Promise<Products[]> => {
    const response = await fetch('/api/v1/point-products')
    const data = await response.json()

    return mapServerProductsToClient(data.result.content)
  },

  getProduct: async (productId: string | undefined): Promise<ProductDetail> => {
    const response = await fetch(`/api/v1/point-products/${productId}`)
    const data = await response.json()

    return mapServerProductDetailToClient(data.result)
  },
}

const productsKey = createQueryKeys('products', {
  list: () => ['list'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const productQueryKeys = productsKey
