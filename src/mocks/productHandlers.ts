import { productMocking } from '@/store/mocking/productMocking'
import { http, HttpResponse } from 'msw'

export const productHandlers = [
  http.get('/api/v1/point-products', () => {
    const response = productMocking.getState().products
    return HttpResponse.json(response)
  }),

  http.get('/api/v1/point-products/:pointProductId', ({ params }) => {
    const productId = parseInt(params['pointProductId'] as string)

    const response = productMocking.getState().getProduct(productId)

    if (!response.success) {
      return HttpResponse.json(response, { status: 404 })
    }

    return HttpResponse.json(response)
  }),
]
