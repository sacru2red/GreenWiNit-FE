export type Product = {
  pointProductId: number
  pointProductName: string
  thumbnailUrl: string
  pointPrice: number
  sellingStatus: string
}

export type ProdcutDetailType = Product & {
  description: string
  stockQuantity: number
}

export type ExchangeProduct = {
  deliveryAddressId: number
  orderItemId: number
  quantity: number
}
