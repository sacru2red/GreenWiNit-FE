import { InformationMockingStore } from '@/store/InformationMockingStore'
import { http, HttpResponse } from 'msw'

export const InformationHandlers = [
  http.get('/api/user/info', () => {
    const response = InformationMockingStore.getState().getInformations()
    return HttpResponse.json(response)
  }),

  http.get('/api/user/info/:infoId', ({ params }) => {
    const infoId = parseInt(params['infoId'] as string)

    const response = InformationMockingStore.getState().getInformationById(infoId)

    if (response === undefined) {
      return HttpResponse.json(response, { status: 404 })
    }

    return HttpResponse.json(response)
  }),
]
