// https://mswjs.io/docs/quick-start#2-request-handlers
import { Team } from '@/api/challenges'
import { GetMyInfoResponse } from '@/api/users'
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
  http.post('/api/auth/withdraw', ({ cookies }) => {
    const authToken = cookies['authToken']

    if (!authToken) {
      return HttpResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        },
      )
    }
    return HttpResponse.json(
      {
        success: true,
        message: '회원 탈퇴가 완료되었습니다.',
      },
      {
        status: 200,
        statusText: 'OK',
      },
    )
  }),

  http.get('/api/v1/users/me/status', ({ cookies }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    return HttpResponse.json({
      success: true,
      message: '사용자 정보 조회에 성공했습니다.',
      result: {
        userTotalPoints: foundUser.point,
        userChallengeCount: foundUser.challengeCount,
        userLevel: foundUser.level.code,
      },
    } satisfies GetMyInfoResponse)
  }),

  http.get('/api/v1/challenges', () => {
    return HttpResponse.json(
      apiServerMockingStore.getState().challenges.map((c) => {
        if (c.type !== 1) {
          return c
        }
        return {
          ...c,
          teams: c.teams.filter((t) => !t.isDeleted),
        }
      }),
    )
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

    if (challenge.type === 1) {
      return HttpResponse.json({
        ...challenge,
        teams: challenge.teams
          .filter((t) => !t.isDeleted)
          .map((t) => ({
            ...t,
            isJoinAllowed: t.users.length < t.maxMemberCount,
          })),
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
    const joinedTeams = teams
      .filter((t) => t.users.some((u) => u.id === foundUser.id))
      .filter((t) => !t.isDeleted)
      .map((t) => ({
        ...t,
        isJoinAllowed: t.users.length < t.maxMemberCount,
      }))

    return HttpResponse.json(joinedTeams)
  }),

  http.get('/api/v1/challenges/:challengeId/teams/:teamId', ({ params }) => {
    const challengeId = params['challengeId']
    const teamId = params['teamId']
    const challenge = apiServerMockingStore.getState().challenges.find((c) => c.id === challengeId)
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
    if (team.isDeleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found team',
      })
    }
    return HttpResponse.json(team)
  }),

  http.get('/api/v1/users/me/points-history', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status') // 'earn' 또는 'spend' 또는 null

    const allContent = [
      {
        pointTransactionId: '1L',
        description: '챌린지 적립',
        amount: 1000,
        status: 'EARN',
        transactionAt: '2025-07-26T10:31:16.805Z',
      },
      {
        pointTransactionId: '2L',
        description: '굿즈 구매',
        amount: 500,
        status: 'SPEND',
        transactionAt: '2025-07-25T14:20:00.000Z',
      },
      {
        pointTransactionId: '3L',
        description: '친환경 텀블러 교환',
        amount: 700,
        status: 'SPEND',
        transactionAt: '2025-07-21T14:31:16.805Z',
      },
      {
        pointTransactionId: '4L',
        description: '회원가입 보너스',
        amount: 1000,
        status: 'EARN',
        transactionAt: '2025-07-20T14:31:16.805Z',
      },
      {
        pointTransactionId: '5L',
        description: '플라스틱 줄이기 챌린지 완료',
        amount: 800,
        status: 'EARN',
        transactionAt: '2025-07-18T12:31:16.805Z',
      },
    ]

    const filteredContent = status
      ? allContent.filter((item) => item.status.toLowerCase() === status.toLowerCase())
      : allContent

    return HttpResponse.json({
      success: true,
      message: '포인트 내역 조회 성공',
      result: {
        hasNext: false,
        nextCursor: null,
        content: filteredContent,
      },
    })
  }),
  http.get('/api/v1/users/me/points', () => {
    return HttpResponse.json({
      success: true,
      message: 'string',
      result: {
        currentBalance: 4500,
        totalEarned: 5200,
        totalSpent: 700,
      },
    })
  }),
  http.post('/api/v1/challenges/:id/submit', async () => {
    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),

  http.post('/api/v1/challenges/:challengeId/submit/team/:teamId', async () => {
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
    if (team == null || team.isDeleted) {
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

  http.post('/api/v1/challenges/:challengeId/teams', async ({ params, cookies, request }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const challengeId = params['challengeId']
    if (challengeId == null || typeof challengeId !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid id',
      })
    }

    const apiServerMockingStoreState = apiServerMockingStore.getState()
    const { challenges, enrollTeam } = apiServerMockingStoreState
    const challenge = challenges.find((c) => c.id === challengeId)
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

    const team = await request.json()
    if (team == null) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error: not valid team',
      })
    }
    if (
      typeof team !== 'object' ||
      team['name'] == null ||
      team['date'] == null ||
      team['startAt'] == null ||
      team['endAt'] == null ||
      team['address'] == null ||
      team['description'] == null ||
      team['maxMemberCount'] == null ||
      team['openChatUrl'] == null
    ) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error: not valid team',
      })
    }
    const typedTeam = team as Omit<Team, 'users' | 'id'>
    enrollTeam(challengeId, typedTeam, foundUser)

    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),
  http.post('/api/images', async ({ request }) => {
    const url = new URL(request.url)
    const purpose = url.searchParams.get('purpose')

    const validPurposes = {
      challenge: 'https://dummyimage.com/600x400/ff4444/ffffff.png&text=Challenge',
      'challenge-cert': 'https://dummyimage.com/600x400/44ff44/ffffff.png&text=Cert',
      info: 'https://dummyimage.com/600x400/4444ff/ffffff.png&text=Info',
      product: 'https://dummyimage.com/600x400/ffbb33/ffffff.png&text=Product',
      profile: 'https://dummyimage.com/600x400/888888/ffffff.png&text=Profile',
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File) || !purpose || !(purpose in validPurposes)) {
      return HttpResponse.json(
        {
          success: false,
          message: '유효하지 않은 요청입니다.',
        },
        {
          status: 500,
          statusText: 'Internal Server Error',
        },
      )
    }

    return HttpResponse.json(
      {
        success: true,
        message: '이미지 업로드에 성공했습니다.',
        result: validPurposes[purpose as keyof typeof validPurposes],
      },
      {
        status: 200,
        statusText: 'OK',
      },
    )
  }),
  http.put('/api/v1/teams/:teamId', async ({ params, cookies, request }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const teamId = params['teamId']
    if (teamId == null || typeof teamId !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid teamId',
      })
    }

    const apiServerMockingStoreState = apiServerMockingStore.getState()
    const { challenges, modifyTeam } = apiServerMockingStoreState
    const challenge = challenges.find((c) => c.type === 1 && c.teams.some((t) => t.id === teamId))
    if (challenge == null || challenge.type !== 1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }
    const foundTeam = challenge.teams.find((t) => t.id === teamId)
    if (foundTeam == null || foundTeam.isDeleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found team',
      })
    }
    const teamLeader = foundTeam.users.find((u) => u.isLeader)
    if (teamLeader == null || teamLeader.id !== foundUser.id) {
      return new HttpResponse(null, {
        status: 403,
        statusText: 'Forbidden: not allowed to delete team',
      })
    }

    const payloadTeam = await request.json()
    if (
      payloadTeam == null ||
      typeof payloadTeam !== 'object' ||
      payloadTeam['name'] == null ||
      payloadTeam['date'] == null ||
      payloadTeam['startAt'] == null ||
      payloadTeam['endAt'] == null ||
      payloadTeam['address'] == null ||
      payloadTeam['description'] == null ||
      payloadTeam['maxMemberCount'] == null ||
      payloadTeam['openChatUrl'] == null
    ) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error: not valid team',
      })
    }
    modifyTeam(payloadTeam as Omit<Team, 'users'>)

    return new HttpResponse('ok', {
      status: 200,
      statusText: 'OK',
    })
  }),

  http.delete('/api/v1/teams/:teamId', async ({ cookies, params }) => {
    const foundUserOrException = getUserFromCookie(cookies)
    if (foundUserOrException instanceof HttpResponse) {
      return foundUserOrException
    }
    const foundUser = foundUserOrException

    const teamId = params['teamId']
    if (teamId == null || typeof teamId !== 'string') {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Bad Request: not valid teamId',
      })
    }
    const apiServerMockingStoreState = apiServerMockingStore.getState()
    const { challenges, deleteTeam } = apiServerMockingStoreState
    const challenge = challenges.find((c) => c.type === 1 && c.teams.some((t) => t.id === teamId))
    if (challenge == null || challenge.type !== 1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found challenge',
      })
    }
    const team = challenge.teams.find((t) => t.id === teamId)
    if (team == null || team.isDeleted) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found: not found team',
      })
    }
    const teamLeader = team.users.find((u) => u.isLeader)
    if (teamLeader == null || teamLeader.id !== foundUser.id) {
      return new HttpResponse(null, {
        status: 403,
        statusText: 'Forbidden: not allowed to delete team',
      })
    }
    deleteTeam(teamId)

    return new HttpResponse(
      JSON.stringify({
        challenge,
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    )
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
