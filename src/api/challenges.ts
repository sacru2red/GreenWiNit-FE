import { createQueryKeys } from '@lukemorales/query-key-factory'

export const challengesApi = {
  getChallenges: async () => {
    const response = await fetch('/api/v1/challenges')
    return response.json() as Promise<Challenge[]>
  },
}

export interface Challenge {
  id: string
  type: 0 | 1
  typeKo: '개인' | '팀'
  name: string
  description: string
  startAt: string
  endAt: string
  status: 0 | 1 | 2
  statusKo: '모집중' | '진행중' | '종료'
  thumbnailUrl: string
}

const challengesKey = createQueryKeys('challenges', {
  list: () => ['list'] as const,
})

export const challengesQueryKeys = challengesKey
