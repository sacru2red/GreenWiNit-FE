import { productMocking } from '@/store/mocking/productMocking'
import { ProdcutDetailMocking } from '@/store/mocking/productDetailMocking'
import { http, HttpResponse } from 'msw'

export const productHandlers = [
  http.get('/api/v1/point-products', () => {
    const response = productMocking.getState().getProducts()
    return HttpResponse.json(response)
  }),

  http.get('/api/v1/point-products/:pointProductId', ({ params }) => {
    const productId = parseInt(params['pointProductId'] as string)

    const response = ProdcutDetailMocking.getState().getProductDetail(productId)

    if (!response.success) {
      return HttpResponse.json(response, { status: 404 })
    }

    return HttpResponse.json(response)
  }),
]
