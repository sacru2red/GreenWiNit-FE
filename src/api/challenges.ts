import { API_URL } from '@/constant/network'
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { stringify } from '@/lib/query-string'
import { omit } from 'es-toolkit'
import { ApiResponse, CursorPaginatedResponse } from '@/types/api'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ChallengeType } from '@/types/challenge'

export const challengesApi = {
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
  getIndividualChallengeDetail: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/personal/${id}`)
    return response.json() as Promise<ApiResponse<CommonChallengeDetail>>
  },
  getTeamChallengeDetail: async (id: number) => {
    const response = await fetch(`${API_URL}/challenges/team/${id}`)
    return response.json() as Promise<ApiResponse<CommonChallengeDetail>>
  },
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
  joinChallenge: async ({ id, challengeType }: { id: number; challengeType: ChallengeType }) => {
    return fetch(
      `${API_URL}/challenges/${challengeType === 'individual' ? 'personal' : 'team'}/${id}/participate`,
      {
        method: 'POST',
      },
    ).then(throwResponseStatusThenChaining)
  },
  getJoinedTeamsMine: async ({
    challengeId,
    cursor,
    pageSize,
  }: {
    challengeId: number
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  }) => {
    const response = await fetch(
      `${API_URL}/challenges/${challengeId}/groups/me?${stringify({ cursor, pageSize })}`,
    )
    return response.json() as Promise<
      CursorPaginatedResponse<ChallengeTeamsCommonElement & { leaderMe: boolean }>
    >
  },
  joinTeam: async (_challengeId: number, teamId: number) => {
    return fetch(`${API_URL}/challenges/groups/${teamId}`, {
      method: 'POST',
    }).then(throwResponseStatusThenChaining)
  },
  getChallengesTeams: async ({
    challengeId,
    cursor,
    pageSize,
  }: {
    challengeId: number
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  }) => {
    const response = await fetch(
      `${API_URL}/challenges/${challengeId}/groups?${stringify({ cursor, pageSize })}`,
    )
    return response.json() as Promise<CursorPaginatedResponse<ChallengeTeamsCommonElement>>
  },
  getChallengesTeam: async (teamId: number) => {
    return await fetch(`${API_URL}/challenges/groups/${teamId}`).then((res) => {
      return res.json() as Promise<ApiResponse<TeamDetailResponse>>
    })
  },
  enrollTeam: async (challengeId: number, team: TeamCreateRequestDto) => {
    return fetch(`${API_URL}/challenges/${challengeId}/groups`, {
      method: 'POST',
      body: JSON.stringify(team),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(throwResponseStatusThenChaining)
  },
  deleteTeam: async (teamId: number) => {
    return fetch(`${API_URL}/challenges/groups/${teamId}`, { method: 'DELETE' }).then(
      throwResponseStatusThenChaining,
    )
  },
  modifyTeam: async (team: TeamModifyRequestDto) => {
    return fetch(`${API_URL}/challenges/groups/${team.id}`, {
      method: 'PUT',
      body: JSON.stringify(omit(team, ['id'])),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(throwResponseStatusThenChaining)
  },
  submitIndividualChallenge: async (
    challengeId: number,
    body: {
      date: string
      imageUrl: string
      review: string
    },
  ) => {
    return await fetch(`${API_URL}/certifications/challenges/personal/${challengeId}`, {
      method: 'POST',
      body: JSON.stringify({
        ...omit(body, ['date']),
        challengeDate: body.date,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  submitTeamChallenge: async (params: { teamId: number; imageUrl: string; review: string }) => {
    return await fetch(`${API_URL}/certifications/challenges/team/${params.teamId}`, {
      method: 'POST',
      body: JSON.stringify({
        imageUrl: params.imageUrl,
        review: params.review,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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
  getCertifiedChallengeDetails: async (certificationId: number) => {
    const response = await fetch(`${API_URL}/certifications/challenges/${certificationId}`)
    return response.json() as Promise<
      ApiResponse<{
        id: number
        challengeName: string
        certifiedDate: string
        imageUrl: string
        review: string
        certificationStatus: '인증 요청' | '지급' | '미지급'
      }>
    >
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
  challengeContent: string
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

export interface ChallengeTeamsCommonElement {
  id: number
  groupName: string
  /**
   * ex) 강남구
   */
  signungu: string
  challengeDate: string
  startTime: string
  endTime: string
  currentParticipants: number
  maxParticipants: number
  /**
   * '2025-08-03T18:22:28.234Z'
   */
  createdDate: string
}

interface TeamCreateRequestDto {
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
   * ex) 강남구
   */
  sigungu: string
  /**
   * '매주 화, 목 저녁 7시에 모여서 5km 러닝합니다.'
   */
  description: string
  /**
   * 'https://open.kakao.com/o/abc123'
   */
  openChatUrl: string
  /**
   * '2025-08-03T18:22:28.234Z'
   */
  beginDateTime: string
  /**
   * '2025-08-03T18:22:28.234Z'
   */
  endDateTime: string
  maxParticipants: number

  /** 오타 */
  challengeData: string
  /** hh:mm */
  startTime: string
  /** hh:mm */
  endTime: string
}

export interface TeamModifyRequestDto extends TeamCreateRequestDto {
  id: number
}

export interface TeamDetailResponse {
  id: number
  groupName: string
  currentParticipants: number
  maxParticipants: number
  description: string
  challengeDate: string
  startTime: string
  endTime: string
  roadAddress: string
  detailAddress: string
  sigungu: string
  fullAddress: string
  openChatUrl: string
  participating: boolean
}

export interface GetCertifiedChallengesMineElement {
  id: number
  challengeName: string
  certifiedDate: string
  certificationStatus: string
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
  team: (teamId: number | undefined) => ['teams', teamId] as const,
  teams: ({
    challengeId,
    cursor,
    pageSize,
  }: {
    challengeId: number | undefined
    cursor?: number | null | undefined
    pageSize?: number | null | undefined
  }) =>
    [
      challengeId,
      'teams',
      { cursor: cursor ?? undefined, pageSize: pageSize ?? undefined },
    ] as const,
  joinedTeams: (challengeId: number | undefined) => [challengeId, 'teams', 'joined'] as const,
})

export const challengesQueryKeys = mergeQueryKeys(challengesKey)
