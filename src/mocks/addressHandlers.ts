import { API_URL } from '@/constant/network'
import { clientToServerAddress } from '@/api/address'
import { addressMocking } from '@/store/mocking/addressMocking'
import { ClientAddressInfo, ServerPostAddress } from '@/types/addresses'
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
  http.post('/api/v1/deliveries/addresses', async ({ request }) => {
    try {
      let nextId = 2
      const body = (await request.json()) as ServerPostAddress

      if (
        !body.recipientName ||
        !body.phoneNumber ||
        !body.roadAddress ||
        !body.detailAddress ||
        !body.zipCode
      ) {
        return HttpResponse.json(
          {
            success: false,
            message: '필수 필드가 누락되었습니다.',
            result: null,
          },
          { status: 400 },
        )
      }

      const newAddress = {
        deliveryAddressId: nextId++,
        ...body,
      }

      return HttpResponse.json({
        success: true,
        message: '배송지 정보 추가가 성공했습니다.',
        result: newAddress,
      })
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다',
          result: null,
        },
        { status: 500 },
      )
    }
  }),
]
