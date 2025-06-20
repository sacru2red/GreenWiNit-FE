// https://mswjs.io/docs/quick-start#2-request-handlers
import { UserStatus } from '@/api/users'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/users/me/status', () => {
    // http.get('www.foo.api/ans', () => {
    return HttpResponse.json({
      point: 1200,
      challengeCount: 35,
      level: {
        name: 'Silver',
        code: 2,
        exp: 2300,
        nextLevelExp: 3000,
      },
    } satisfies UserStatus)
  }),
]
