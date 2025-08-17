import { API_URL } from '@/constant/network'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { stringify } from '@/lib/query-string'
import { omit } from 'es-toolkit'
import { ApiResponse, CursorPaginatedResponse } from '@/types/api'

export const challengesApi = {
  getIndividualChallenges: async (cursor?: number | null) => {
    const response = await fetch(`${API_URL}/challenges/personal?${stringify({ cursor })}`)
    return response.json() as Promise<
      ApiResponse<{
        hasNext: boolean
        nextCursor: number | null
        content: CommonChallenge[]
      }>
    >
  },
  getTeamChallenges: async (cursor?: number | null) => {
    const response = await fetch(`${API_URL}/challenges/team?${stringify({ cursor })}`)
    return response.json() as Promise<
      ApiResponse<{
        hasNext: boolean
        nextCursor: number | null
        content: CommonChallenge[]
      }>
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
    return response.json() as Promise<JoinedChallengesMineReponse>
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
            content: Array<ChallengeTeamsElement>
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
        content: Array<ChallengeTeamsElement>
      } | null
    }>
  },
  getChallengesTeam: async (challengeId: number, teamId: number) => {
    const response = await fetch(`${API_URL}/challenges/${challengeId}/groups/${teamId}`)
    return response.json() as Promise<
      | {
          success: true
          message: string
          result: TeamDetailResponse
        }
      | {
          success: false
          message: string
          result: null
        }
    >
  },
  enrollTeam: async (challengeId: number, team: TeamCreateRequestDto) => {
    return fetch(`${API_URL}/challenges/${challengeId}/groups`, {
      method: 'POST',
      body: JSON.stringify(team),
    })
  },
  deleteTeam: async (teamId: number) => {
    return fetch(`${API_URL}/challenges/groups/${teamId}`, { method: 'DELETE' })
  },
  modifyTeam: async (team: TeamModifyRequestDto) => {
    return fetch(`${API_URL}/challenges/groups/${team.id}`, {
      method: 'PUT',
      body: JSON.stringify(omit(team, ['id'])),
    })
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
  getCertifiedChallengesMine: async ({
    cursor,
    pageSize,
    challengeType,
  }: {
    cursor?: number | null
    pageSize?: number
    challengeType: 'individual' | 'team'
  }) => {
    const response = await fetch(
      `${API_URL}/certifications/challenges/me?${stringify({ cursor, size: pageSize, type: challengeType === 'team' ? 'T' : 'P' })}`,
    )
    return response.json() as Promise<CursorPaginatedResponse<GetCertifiedChallengesMineElement>>
  },
  getCertifiedChallengeDetails: async (certId: number) => {
    const response = await fetch(`${API_URL}/certifications/challenges/${certId}`)
    return response.json() as Promise<
      ApiResponse<{
        id: number
        challengeName: string
        certifiedDate: string
        imageUrl: string
        review: string
        certificationStatus: '인증 요청'
      }>
    >
  },
  postChallengeCertify: async (challengeId: number, body: PostChallengeCertifyRequestBody) => {
    const response = await fetch(`${API_URL}/challenges/${challengeId}/certifications`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json() as Promise<PostChallengeCertRes>
  },
}

export interface CommonChallenge {
  id: number
  challengeName: string
  beginDate: string
  endDate: string
  /**
   * 'https://example.com/image.jpg'
   */
  challengeImage: string
  point: number
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

export type JoinedChallengesMineReponse = ApiResponse<{
  hasNext: boolean
  nextCursor: number | null
  content: CommonChallenge[]
}>

export interface ChallengeTeamsElement {
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

export interface TeamCreateRequestDto {
  /**
   * '강남구 러닝 그룹'
   */
  groupName: string
  /**
   * '서울시 강남구 테헤란로 123'
   */
  roadAddress: string
  /**
   * '삼성동 빌딩 1층'
   */
  detailAddress: string
  /**
   * '매주 화, 목 저녁 7시에 모여서 5km 러닝합니다.'
   */
  groupDescription: string
  /**
   * 'https://open.kakao.com/o/abc123'
   */
  openChatUrl: string
  /**
   * '2025-08-03T18:22:28.234Z'
   */
  groupBeginDateTime: string
  /**
   * '2025-08-03T18:22:28.234Z'
   */
  groupEndDateTime: string
  maxParticipants: number
}

export interface TeamModifyRequestDto extends TeamCreateRequestDto {
  id: string
}

export interface TeamDetailResponse {
  id: number
  groupName: string
  groupAddress: string
  groupDescription: string
  openChatUrl: string
  groupBeginDateTime: string
  groupEndDateTime: string
  currentParticipants: number
  maxParticipants: number
  groupStatus: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED'
  isLeader: boolean
  isParticipant: boolean
}

type PostChallengeCertRes = ApiResponse<{
  certificationId: number
}>

interface PostChallengeCertifyRequestBody {
  certificationDate: string
  certificationImageUrl: string
  certificationReview: string
}

export interface GetCertifiedChallengesMineElement {
  id: number
  challengeName: string
  certifiedDate: string
  certificationStatus: string
  // https://github.com/GreenWiNit/backend/issues/267
  challengeImage: string
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
  certifiedDetail: ({ certId }: { certId: number }) =>
    ['my-certified', 'details', { certId }] as const,
  listCertifiedMine: ({
    cursor,
    challengeType,
  }: {
    cursor?: number | null
    challengeType: 'individual' | 'team'
  }) => ['list', 'my-certified', { challengeType, cursor: cursor ?? undefined }] as const,
  detail: (id: number | undefined) => ['detail', id] as const,
  team: (challengeId: number | undefined, teamId: number | undefined) =>
    [challengeId, 'teams', teamId] as const,
  teams: (challengeId: number | undefined) => [challengeId, 'teams'] as const,
  joinedTeams: (challengeId: number | undefined) => [challengeId, 'teams', 'joined'] as const,
})

export const challengesQueryKeys = mergeQueryKeys(challengesKey)
