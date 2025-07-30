import { ClientAddressInfo, clientToServerAddress } from '@/api/address'
import { API_URL } from '@/constant/network'
import { addressMocking } from '@/store/mocking/addressMocking'
import { http, HttpResponse } from 'msw'

export const addressHandlers = [
  http.get(`${API_URL}/deliveries/addresses`, () => {
    const response = addressMocking.getState().addressInfo
    return HttpResponse.json(response)
  }),

  http.post(`${API_URL}/deliveries/addresses`, async ({ request }) => {
    const body = (await request.json()) as Partial<ClientAddressInfo>

    const updateResult = addressMocking.getState().updateAddress(body)

    const addressId = updateResult.result?.id

    if (!addressId) {
      return HttpResponse.json(
        {
          success: false,
          message: '수정하고자 하는 배송지 id가 없습니다',
          result: null,
        },
        { status: 404 },
      )
    }

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
