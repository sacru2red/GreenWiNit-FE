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
  submitTeamChallenge: async (
    challengeId: string | undefined,
    teamId: string | undefined,
    body: FormData,
  ) => {
    if (challengeId == null || teamId == null) {
      throw new Error('challengeId or teamId is required')
    }
    const response = await fetch(`/api/v1/challenges/${challengeId}/submit/team/${teamId}`, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
  getJoinedTeamsMine: async (id: string | undefined) => {
    if (id == null) {
      throw new Error('id is required')
    }
    const response = await fetch(`/api/v1/challenges/${id}/teams/me/joined`)
    return response.json() as Promise<Team[]>
  },
  joinTeam: async (id: string | undefined, teamId: string | undefined) => {
    if (id == null || teamId == null) {
      throw new Error('id or teamId is required')
    }
    const response = await fetch(`/api/v1/challenges/${id}/teams/${teamId}/join`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
  getChallengesTeam: async (challengeId: string | undefined, teamId: string | undefined) => {
    if (challengeId == null || teamId == null) {
      throw new Error('challengeId or teamId is required')
    }
    const response = await fetch(`/api/v1/challenges/${challengeId}/teams/${teamId}`)
    return response.json() as Promise<Team>
  },
  enrollTeam: async (challengeId: string | undefined, team: Omit<Team, 'users' | 'id'>) => {
    if (challengeId == null) {
      throw new Error('challengeId is required')
    }
    const response = await fetch(`/api/v1/challenges/${challengeId}/teams`, {
      method: 'POST',
      body: JSON.stringify(team),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
  deleteTeam: async (teamId: string | undefined) => {
    if (teamId == null) {
      throw new Error('teamId is required')
    }
    const response = await fetch(`/api/v1/teams/${teamId}`, { method: 'DELETE' })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<{ challenge: Challenge }>
  },
  modifyTeam: async (team: Omit<Team, 'users'>) => {
    const response = await fetch(`/api/v1/teams/${team.id}`, {
      method: 'PUT',
      body: JSON.stringify(team),
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
      teams: Team[]
    }
)

interface ParticipationRecord {
  id: string
  date: string
  users: User[]
}

export interface Team {
  id: string
  name: string
  date: string
  startAt: string
  endAt: string
  /**
   * https://postcode.map.daum.net/guide
   */
  address: {
    roadAddress: string
    roadnameCode: string
    zonecode: string
    detailAddress: string
    sigungu: string
  }
  description: string
  maxMemberCount: number
  openChatUrl: string
  users: Array<
    User & {
      isLeader?: boolean
    }
  >
  isDeleted?: boolean
}

const challengesKey = createQueryKeys('challenges', {
  list: () => ['list'] as const,
  listJoinedMine: () => ['list/joined/mine'] as const,
  detail: (id: string | undefined) => ['detail', id] as const,
  team: (challengeId: string | undefined, teamId: string | undefined) =>
    ['team', challengeId, teamId] as const,
})

export const challengesQueryKeys = challengesKey
