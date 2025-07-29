import { ClientAddressInfo, clientToServerAddress } from '@/api/address'
import { API_URL } from '@/constant/network'
import { addressMocking } from '@/store/mocking/addressMocking'
import { http, HttpResponse } from 'msw'

export const addressHandlers = [
  http.get(`${API_URL}/deliveries/addresses`, () => {
    const response = addressMocking.getState().addressInfo
    return HttpResponse.json(response)
  }),
  http.put(`/api/v1/deliveries/addresses/:deliveryAddressId`, async ({ request, params }) => {
    const { deliveryAddressId } = params
    console.log('전체 params:', params) // 전체 params 객체 확인
    console.log('request.url:', request.url) // 실제 요청 URL 확인

    const addressId = deliveryAddressId as string

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

    const id = parseInt(addressId)

    const body = (await request.json()) as Partial<ClientAddressInfo>

    const updateResult = addressMocking.getState().updateAddress(body)

    if (!deliveryAddressId) {
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

    const serverResponse = clientToServerAddress(clientResult, id)

    return HttpResponse.json(serverResponse)
  }),
]
