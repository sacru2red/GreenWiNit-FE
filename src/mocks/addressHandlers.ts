import { API_URL } from '@/constant/network'
import { clientToServerAddress } from '@/api/address'
import { addressMocking } from '@/store/mocking/addressMocking'
import { ClientAddressInfo } from '@/types/addresses'
import { http, HttpResponse } from 'msw'

export const addressHandlers = [
  http.get(`${API_URL}/deliveries/addresses`, () => {
    const response = addressMocking.getState().getAddress()
    if (!response) {
      return HttpResponse.json({
        success: false,
        message: '유효하지 않은 요청입니다.',
        result: null,
      })
    }

    const serverResponse = clientToServerAddress(response, response.id)

    return HttpResponse.json({
      success: true,
      message: '배송지 조회에 성공했습니다.',
      result: serverResponse,
    })
  }),
  http.put(`${API_URL}/deliveries/addresses/:deliveryAddressId`, async ({ request, params }) => {
    const { deliveryAddressId } = params

    if (!deliveryAddressId || isNaN(Number(deliveryAddressId))) {
      return HttpResponse.json(
        {
          success: false,
          message: '유효하지 않은 배송지 ID입니다',
          result: null,
        },
        { status: 400 },
      )
    }

    const body = (await request.json()) as Partial<ClientAddressInfo>

    const updateResult = addressMocking.getState().updateAddress(body)

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

    const serverResponse = clientToServerAddress(clientResult, clientResult.id)

    return HttpResponse.json({
      success: true,
      message: '배송지를 수정할 수 없습니다',
      result: serverResponse,
    })
  }),
  http.post(`${API_URL}/deliveries/addresses`, async ({ request }) => {
    const body = (await request.json()) as ClientAddressInfo
    const data = addressMocking.getState().enrollAddress(body)

    if (!data.success || !data.result) {
      return HttpResponse.json(data)
    }

    const serverResponse = clientToServerAddress(data.result, data.result.id)

    return HttpResponse.json({
      sucess: true,
      message: '배송지 정보 추가에 성공하였습니다',
      result: serverResponse,
    })
  }),
]
