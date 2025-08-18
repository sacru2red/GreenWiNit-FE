import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ApiResponse } from '@/types/api'
import { ExchangeProduct } from '@/types/product'

export const pointApi = {
  exchangeProduct: async (body: ExchangeProductDto) => {
    /* 멱등 키 생성 (uuid 이용) */
    const idempotencyKey = crypto.randomUUID()
    console.log(idempotencyKey)

    return await fetch(`${API_URL}/orders/point-products/single`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(body),
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ExchangeProductResponse>)
  },
}

type ExchangeProductResponse = ApiResponse<ExchangeProduct>
type ExchangeProductDto = ExchangeProduct
