import { apiServerMockingStore } from '@/store/api-server-mocking-store'
import { http, HttpResponse } from 'msw'
import { API_URL } from '@/constant/network'

export const productHandlers = [
  http.get(`${API_URL}/point-products`, () => {
    const response = apiServerMockingStore.getState().getProducts()
    return HttpResponse.json(response)
  }),

  http.get(`${API_URL}/point-products/:pointProductId`, ({ params }) => {
    const productId = parseInt(params['pointProductId'] as string)

    const response = apiServerMockingStore.getState().getProductDetail(productId)

    if (!response) {
      return HttpResponse.json(
        {
          success: false,
          message: '해당 상품을 찾을 수 없습니다.',
          result: null,
        },
        { status: 404 },
      )
    }

    return HttpResponse.json(response)
  }),
]
