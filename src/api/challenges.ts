import { API_URL } from '@/constant/network'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { stringify } from '@/lib/query-string'
import { omit } from 'es-toolkit'
import { ApiResponse, CursorPaginatedResponse } from '@/types/api'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ChallengeType } from '@/types/challenge'

export const challengesApi = {
  // @MEMO v2 작업완료
  getIndividualChallenges: async ({
    cursor,
    pageSize,
  }: {
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  } = {}) => {
    const response = await fetch(
      `${API_URL}/challenges/personal?${stringify({ cursor, pageSize })}`,
    )
    return response.json() as Promise<CursorPaginatedResponse<CommonChallenge>>
  },
  // @MEMO v2 작업완료
  getIndividualChallengeDetail: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/personal/${id}`)
    return response.json() as Promise<ApiResponse<CommonChallengeDetail>>
  },
  // @MEMO v2 작업완료
  getTeamChallengeDetail: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/team/${id}`)
    return response.json() as Promise<ApiResponse<CommonChallengeDetail>>
  },
  // @MEMO v2 작업완료
  getTeamChallenges: async ({
    cursor,
    pageSize,
  }: {
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  } = {}) => {
    const response = await fetch(`${API_URL}/challenges/team?${stringify({ cursor, pageSize })}`)
    return response.json() as Promise<CursorPaginatedResponse<CommonChallenge>>
  },
  // @MEMO v2 작업완료
  getJoinedChallengesMine: async ({
    cursor,
    challengeType,
    pageSize,
  }: {
    cursor?: number | null
    challengeType: ChallengeType
    pageSize?: number | null | undefined
  }) => {
    return await fetch(
      `${API_URL}/challenges/${challengeType === 'individual' ? 'personal' : 'team'}/me?${stringify({ cursor, size: pageSize })}`,
    )
      .then((res) => {
        return res.json() as Promise<JoinedChallengesMineReponse>
      })
      .then((res) => {
        return {
          ...res,
          result: {
            ...res.result,
            content: res.result?.content.map((item) => ({
              ...item,
              point: item.challengePoint,
            })),
          },
        }
      })
  },
  // @MEMO v2 작업완료
  joinChallenge: async ({ id, challengeType }: { id: number; challengeType: ChallengeType }) => {
    return fetch(
      `${API_URL}/challenges/${challengeType === 'individual' ? 'personal' : 'team'}/${id}/participate`,
      {
        method: 'POST',
      },
    ).then(throwResponseStatusThenChaining)
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
    challengeType: ChallengeType
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
  challengeImage: string
  point: number
}

interface CommonChallengeDetail {
  id: number
  title: string
  beginDate: string
  endDate: string
  challengeImage: string
  challengePoint: number
  participating: boolean
  // https://github.com/GreenWiNit/backend/issues/269
  challengeContent: string
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

interface JoinedChallengesMineReponseElement {
  id: number
  challengeName: string
  beginDate: string
  endDate: string
  challengeImage: string
  challengePoint: number
}
type JoinedChallengesMineReponse = CursorPaginatedResponse<JoinedChallengesMineReponseElement>

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
  individual: ['individual'] as const,
  list: ({
    challengeType,
    cursor,
    pageSize,
  }: {
    challengeType: ChallengeType
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  }) =>
    [
      challengeType,
      'list',
      { cursor: cursor ?? undefined, pageSize: pageSize ?? undefined },
    ] as const,
  listJoinedMine: ({
    cursor,
    challengeType,
    pageSize,
  }: {
    cursor?: number | null
    challengeType: ChallengeType
    pageSize?: number | null | undefined
  }) =>
    [
      'list',
      'my-joined',
      { challengeType, cursor: cursor ?? undefined, pageSize: pageSize ?? undefined },
    ] as const,
  certifiedDetail: ({ certId }: { certId: number }) =>
    ['my-certified', 'details', { certId }] as const,
  listCertifiedMine: ({
    cursor,
    challengeType,
  }: {
    cursor?: number | null
    challengeType: ChallengeType
  }) => ['list', 'my-certified', { challengeType, cursor: cursor ?? undefined }] as const,
  detail: ({ id, challengeType }: { id: number | undefined; challengeType: ChallengeType }) =>
    [challengeType, { id: id ?? undefined }] as const,
  team: (challengeId: number | undefined, teamId: number | undefined) =>
    [challengeId, 'teams', teamId] as const,
  teams: (challengeId: number | undefined) => [challengeId, 'teams'] as const,
  joinedTeams: (challengeId: number | undefined) => [challengeId, 'teams', 'joined'] as const,
})

export const challengesQueryKeys = mergeQueryKeys(challengesKey)
