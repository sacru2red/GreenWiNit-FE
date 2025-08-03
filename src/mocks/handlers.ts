// https://mswjs.io/docs/quick-start#2-request-handlers
import { MockedTeam } from '@/api/challenges'
import { User } from '@/store/auth-store'
import { http, HttpResponse } from 'msw'

export const handlers = [
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
]

export type Challenge = {
  id: string
  name: string
  /**
   * @deprecated
   * howToJoin하고 description 중 하나만 사용할 수도 있음..
   */
  description: string
  howToJoin: string
  startAt: string
  endAt: string
  status: 0 | 1 | 2
  statusKo: '모집중' | '진행중' | '종료'
  thumbnailUrl: string
  point: number
  joinUserIds: string[]
} & (
  | {
      type: 0
      typeKo: '개인'
      // 참여기록
      participationRecords: ParticipationRecord[]
    }
  | {
      type: 1
      typeKo: '팀'
      teams: MockedTeam[]
    }
)

interface ParticipationRecord {
  id: string
  date: string
  users: User[]
}
