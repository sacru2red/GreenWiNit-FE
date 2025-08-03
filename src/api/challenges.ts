import { API_URL } from '@/constant/network'
import { type User } from '@/store/auth-store'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { stringify } from '@/lib/query-string'
import { Challenge as MockedChallenge } from '@/mocks/handlers'

export const challengesApi = {
  getIndividualChallenges: async (cursor?: number | null) => {
    const response = await fetch(`${API_URL}/challenges/personal?${stringify({ cursor })}`)
    return response.json() as Promise<
      | {
          success: true
          message: string
          result: {
            hasNext: boolean
            nextCursor: number | null
            content: Challenge[]
          }
        }
      | {
          success: false
          message: string
          result: null
        }
    >
  },
  getTeamChallenges: async (cursor?: number | null) => {
    const response = await fetch(`${API_URL}/challenges/team?${stringify({ cursor })}`)
    return response.json() as Promise<
      | {
          success: true
          message: string
          result: {
            hasNext: boolean
            nextCursor: number | null
            content: Challenge[]
          }
        }
      | {
          success: false
          message: string
          result: null
        }
    >
  },
  getJoinedChallengesMine: async ({
    cursor,
    challengeType,
  }: {
    cursor?: number | null
    challengeType: 'individual' | 'team'
  }) => {
    const response = await fetch(
      `${API_URL}/my/challenges/${challengeType === 'individual' ? 'personal' : 'team'}?${stringify({ cursor })}`,
    )
    return response.json() as Promise<{
      success: true
      message: string
      result:
        | {
            hasNext: boolean
            nextCursor: number | null
            content: Challenge[]
          }
        | {
            success: false
            message: string
            content: null
          }
    }>
  },
  getChallengeDetail: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/${id}`)
    return response.json() as Promise<{
      success: true
      message: string
      result: ChallengeDetailResponse
    }>
  },
  joinChallenge: async (id: number) => {
    return fetch(`${API_URL}/challenges/${id}/participate`, {
      method: 'POST',
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
  },
  getJoinedTeamsMine: async (id: number) => {
    // @TODO replace API
    // https://github.com/GreenWiNit/backend/issues/188
    const response = await fetch(`${API_URL}/challenges/${id}/groups`)
    return response.json() as Promise<
      | {
          success: true
          message: string
          result: {
            hasNext: boolean
            nextCursor: number | null
            content: Array<Team>
          }
        }
      | {
          success: false
          message: string
          result: null
        }
    >
  },
  joinTeam: async (_challengeId: number, teamId: number) => {
    return fetch(`${API_URL}/challenges/groups/${teamId}`, {
      method: 'POST',
    })
  },
  getChallengesTeams: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/${id}/groups`)
    return response.json() as Promise<{
      success: true
      message: string
      result: {
        hasNext: boolean
        nextCursor: number | null
        content: Array<Team>
      } | null
    }>
  },
  getChallengesTeam: async (challengeId: number, teamId: number) => {
    const response = await fetch(`${API_URL}/challenges/${challengeId}/teams/${teamId}`)
    return response.json() as Promise<MockedTeam>
  },
  enrollTeam: async (challengeId: number | undefined, team: Omit<MockedTeam, 'users' | 'id'>) => {
    if (challengeId == null) {
      throw new Error('challengeId is required')
    }
    const response = await fetch(`${API_URL}/challenges/${challengeId}/teams`, {
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
    const response = await fetch(`${API_URL}/teams/${teamId}`, { method: 'DELETE' })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<{ challenge: MockedChallenge }>
  },
  modifyTeam: async (team: Omit<MockedTeam, 'users'>) => {
    const response = await fetch(`${API_URL}/teams/${team.id}`, {
      method: 'PUT',
      body: JSON.stringify(team),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return
  },
  submitChallenge: async (
    challengeId: number,
    body: {
      date: string
      imageUrl: string
      review: string
    },
  ) => {
    await fetch(`${API_URL}/challenges/${challengeId}/certifications`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
}

export interface Challenge {
  id: number
  challengeName: string
  /**
   * '2025-08-03T13:25:09.938Z'
   */
  beginDateTime: string
  /**
   * '2025-08-03T13:25:09.938Z'
   */
  endDateTime: string
  /**
   * 'https://example.com/image.jpg'
   */
  challengeImage: string
  point: number
  /**
   * @TODO fix under line
   */
  type?: 'PERSONAL' | 'TEAM'
}

export interface ChallengeDetailResponse {
  id: 0
  /**
   * challengeName
   */
  title: string
  /**
   * '2025-08-03T13:41:48.131Z'
   */
  beginDateTime: string
  /**
   * '2025-08-03T13:41:48.131Z'
   */
  endDateTime: string
  /**
   * challengeImage
   */
  imageUrl: string
  point: number
  /**
   * @TODO fix type
   */
  participationStatus: 'NOT_LOGGED_IN'
  /**
   * @TODO fix under line
   */
  content?: string
  /**
   * @TODO fix under line
   */
  type?: 'PERSONAL' | 'TEAM'
}

export interface MockedTeam {
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

export interface Team {
  id: number
  groupName: string
  groupAddress: string
  groupBeginDateTime: string
  groupEndDateTime: string
  currentParticipants: number
  maxParticipants: number
  groupStatus: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED'
  isLeader: boolean
}

export const CHALLENGE_ROOT_QUERY_KEY = 'challenges'
const challengesKey = createQueryKeys(CHALLENGE_ROOT_QUERY_KEY, {
  list: ({
    challengeType,
    cursor,
  }: {
    challengeType: 'individual' | 'team'
    cursor?: number | null
  }) => ['list', { challengeType, cursor: cursor ?? undefined }] as const,
  listJoinedMine: ({
    cursor,
    challengeType,
  }: {
    cursor?: number | null
    challengeType: 'individual' | 'team'
  }) => ['list', 'my-joined', { challengeType, cursor: cursor ?? undefined }] as const,
  detail: (id: number | undefined) => ['detail', id] as const,
  team: (challengeId: number | undefined, teamId: number | undefined) =>
    [challengeId, 'teams', teamId] as const,
  teams: (challengeId: number | undefined) => [challengeId, 'teams'] as const,
  joinedTeams: (challengeId: number | undefined) => [challengeId, 'teams', 'joined'] as const,
})

export const challengesQueryKeys = mergeQueryKeys(challengesKey)
