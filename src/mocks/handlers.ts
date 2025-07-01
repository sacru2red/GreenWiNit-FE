// https://mswjs.io/docs/quick-start#2-request-handlers
import { UserStatus } from '@/api/users'
import { apiServerMockingStore, ME } from '@/store/apiServerMockingStore'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore: body is not typed */
    const oAuthToken = body?.['oAuthToken']
    console.log('oAuthToken', oAuthToken)

    if (oAuthToken == 'ok-this-is-valid-oAuth-token') {
      return new HttpResponse(JSON.stringify(ME), {
        status: 200,
        statusText: 'OK',
        headers: {
          'set-cookie': 'authToken=abc-123',
        },
      })
    }

    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'set-cookie': 'authToken=;',
      },
    })
  }),

  http.post('/api/logout', async () => {
    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
      headers: {
        'set-cookie': 'authToken=;',
      },
    })
  }),

  http.get('/api/v1/users/me/status', ({ cookies }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    return HttpResponse.json({
      point: foundUser.point,
      challengeCount: foundUser.challengeCount,
      level: {
        name: foundUser.level.name,
        code: foundUser.level.code,
        exp: foundUser.level.exp,
        nextLevelExp: foundUser.level.nextLevelExp,
      },
    } satisfies UserStatus)
  }),

  http.get('/api/v1/challenges', () => {
    return HttpResponse.json(apiServerMockingStore.getState().challenges)
  }),

  http.get('/api/v1/challenges/user/me/joined', ({ cookies }) => {
    const authToken = cookies['authToken']

    if (authToken == null || authToken == '') {
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized: not valid authToken',
      })
    }

    const foundUser = apiServerMockingStore.getState().users[0]
    if (foundUser == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found user',
      })
    }

    return HttpResponse.json(
      apiServerMockingStore
        .getState()
        .challenges.filter((c) => c.joinUserIds.includes(foundUser.id)),
    )
  }),

  http.get('/api/v1/challenges/:id', ({ params }) => {
    const id = params['id']
    const challenge = apiServerMockingStore.getState().challenges.find((c) => c.id === id)
    if (challenge == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }

    return HttpResponse.json(challenge)
  }),

  http.get('/api/v1/challenges/:id/teams/me/joined', ({ cookies, params }) => {
    const id = params['id']
    if (id == null || typeof id !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid id',
      })
    }
    const challenge = apiServerMockingStore.getState().challenges.find((c) => c.id === id)
    if (challenge == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }
    if (challenge.type !== 1) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error: cannot join team challenge (only team challenge)',
      })
    }

    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const teams = challenge.teams
    const joinedTeams = teams.filter((t) => t.users.some((u) => u.id === foundUser.id))

    return HttpResponse.json(joinedTeams)
  }),

  http.post('/api/v1/challenges/:id/submit', async () => {
    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),

  http.post('/api/v1/challenges/:id/join', async ({ params, cookies }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const id = params['id']
    if (id == null || typeof id !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid id',
      })
    }

    const apiServerMockingStoreState = apiServerMockingStore.getState()
    const { challenges, joinChallenge } = apiServerMockingStoreState
    const challenge = challenges.find((c) => c.id === id)

    if (challenge == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }
    if (challenge.joinUserIds.includes(foundUser.id)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: already joined',
      })
    }

    joinChallenge(id, foundUser)

    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),

  http.post('/api/v1/challenges/:id/teams/:teamId/join', async ({ params, cookies }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const id = params['id']
    const teamId = params['teamId']
    if (id == null || typeof id !== 'string' || teamId == null || typeof teamId !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid id or teamId',
      })
    }

    const apiServerMockingStoreState = apiServerMockingStore.getState()
    const { challenges, joinTeam } = apiServerMockingStoreState
    const challenge = challenges.find((c) => c.id === id)
    if (challenge == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }
    if (challenge.type !== 1) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error: this challenge is not team challenge',
      })
    }
    const team = challenge.teams.find((t) => t.id === teamId)
    if (team == null) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found team',
      })
    }
    if (team.users.some((u) => u.id === foundUser.id)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: already joined',
      })
    }
    joinTeam(teamId, foundUser)

    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),
]

const getUserFromCookie = (cookies: Record<string, string>) => {
  const authToken = cookies['authToken']

  if (authToken == null || authToken == '') {
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized: not valid authToken',
    })
  }

  const foundUser = apiServerMockingStore.getState().users[0]
  if (foundUser == null) {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found: not found user',
    })
  }

  return foundUser
}
