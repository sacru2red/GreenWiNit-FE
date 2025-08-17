import { API_URL } from '@/constant/network'
import { stringify } from '@/lib/query-string'
import { ApiResponse } from '@/types/api'

export const certificationApi = {
  getChallengeCertDetails: async (certId: number) => {
    const response = await fetch(`${API_URL}/my/challenges/certifications/${certId}}`)
    return response.json() as Promise<GetChallengeCertDetailsRes>
  },
  getTeamCertifedChallenges: async (cursor?: number) => {
    const query = cursor ? `?cursor=${cursor}` : ''
    const response = await fetch(`${API_URL}/my/challenges/certifications/team${query}`)
    return response.json() as Promise<GetChallengeCertRes>
  },
  getPersonalCertifedChallenges: async (cursor?: number) => {
    const response = await fetch(
      `${API_URL}/my/challenges/certifications/personal${stringify({ cursor })}`,
    )
    return response.json() as Promise<GetChallengeCertRes>
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

type Content = {
  id: number
  memberId: number
  memberNickname: string
  memberEmail: string
  certificationImageUrl: string
  certificationReview: string
  certifiedDate: string
  status: string
}

type PostChallengeCertRes = ApiResponse<{
  certificationId: number
}>

type GetChallengeCertDetailsRes = ApiResponse<{
  result: Content & {
    certifiedAt: string // ISO 문자열
  }
}>

type GetChallengeCertRes = ApiResponse<{
  result: {
    hasNext: boolean
    nextCursor: number
    content: Content[]
  }
}>

interface PostChallengeCertifyRequestBody {
  certificationDate: string
  certificationImageUrl: string
  certificationReview: string
}
