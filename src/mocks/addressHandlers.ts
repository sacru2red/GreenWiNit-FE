import { ClientAddressInfo, clientToServerAddress } from '@/api/address'
import { addressMocking } from '@/store/mocking/addressMocking'
import { http, HttpResponse } from 'msw'

export const addressHandlers = [
  http.get('api/v1/deliveries/addresses', () => {
    const response = addressMocking.getState().addressInfo
    return HttpResponse.json(response)
  }),

  http.post(`api/v1/deliveries/addresses`, async ({ request }) => {
    const body = (await request.json()) as Partial<ClientAddressInfo>

    const updateResult = addressMocking.getState().updateAddress(body)

    const addressId = updateResult.result?.id ?? 1

    const clientResult = updateResult.result

    if (!clientResult) {
      return HttpResponse.json(
        {
          success: false,
          message: '업데이트된 배송지 정보가 존재하지 않습니다.',
          result: null,
        },
        { status: 500 },
      )
    }

    const serverResponse = clientToServerAddress(clientResult, addressId)

    return HttpResponse.json(serverResponse)
  }),
]
