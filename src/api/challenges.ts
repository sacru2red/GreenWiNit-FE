import { type User } from '@/store/userStore'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const challengesApi = {
  getChallenges: async () => {
    const response = await fetch('/api/v1/challenges')
    return response.json() as Promise<Challenge[]>
  },
  getJoinedChallengesMine: async () => {
    const response = await fetch('/api/v1/challenges/user/me/joined')
    return response.json() as Promise<Challenge[]>
  },
  getChallengeDetail: async (id: string | undefined) => {
    const response = await fetch(`/api/v1/challenges/${id}`)
    return response.json() as Promise<Challenge>
  },
  joinChallenge: async (id: string) => {
    const response = await fetch(`/api/v1/challenges/${id}/join`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
}

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
      teams: Array<{
        id: string
        name: string
        // 참여기록
        participationRecords: ParticipationRecord[]
      }>
    }
)

interface ParticipationRecord {
  id: string
  date: string
  users: User[]
}

const challengesKey = createQueryKeys('challenges', {
  list: () => ['list'] as const,
  listJoinedMine: () => ['list/joined/mine'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
})

export const challengesQueryKeys = challengesKey
