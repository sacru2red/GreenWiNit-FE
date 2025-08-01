import { apiServerMockingStore } from '@/store/api-server-mocking-store'
import { http, HttpResponse } from 'msw'

export const postHandlers = [
  http.get('/api/user/info', () => {
    const response = apiServerMockingStore.getState().getPosts()
    return HttpResponse.json(response)
  }),

  http.get('/api/user/info/:infoId', ({ params }) => {
    const infoId = parseInt(params['infoId'] as string)

    const response = apiServerMockingStore.getState().getPostById(infoId)

    if (response === undefined) {
      return HttpResponse.json(response, { status: 404 })
    }

    return HttpResponse.json(response)
  }),
]
