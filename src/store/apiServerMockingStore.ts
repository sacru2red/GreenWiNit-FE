import { Challenge } from '@/api/challenges'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from './userStore'

interface ApiServerMockingState {
  users: User[]
  challenges: Challenge[]
  joinChallenge: (challengeId: string, user: User) => void
}

export const apiServerMockingStore = create<ApiServerMockingState>()(
  devtools(
    persist(
      (set) => ({
        users: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            point: 1500,
            challengeCount: 35,
            level: {
              name: 'Silver',
              code: 2,
              exp: 2300,
              nextLevelExp: 3000,
            },
          },
        ],
        challenges: [
          {
            id: '1',
            type: 0,
            typeKo: '개인',
            name: '오늘은 따릉이 타는날',
            description: '따릉이 타는 날 챌린지',
            startAt: '2025-08-01',
            endAt: '2025-08-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/661/300/200.jpg?hmac=zVBnVXYPtDskXZnJWjGoYK2R3XwvZJ5ez3ObA07jFSU',
            participationRecords: [],
            joinUserIds: [],
            howToJoin: '자전거를 타고 출발하세요.',
            point: 100,
          },
          {
            id: '2',
            type: 1,
            typeKo: '팀',
            name: '단체 라이딩',
            description: '단체 라이딩 챌린지',
            startAt: '2025-08-01',
            endAt: '2025-08-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/1065/300/200.jpg?hmac=znixKcDX1Ou6rY0EYrczUpfu64rFKBrkiHlNKBhx2Kw',
            teams: [],
            joinUserIds: [],
            howToJoin: '다같이 모여 자전거를 타고 출발하세요.',
            point: 200,
          },
          {
            id: '3',
            type: 0,
            typeKo: '개인',
            name: '비닐 대신 에코백',
            description: '비닐 대신 에코백 챌린지',
            startAt: '2025-07-01',
            endAt: '2025-07-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/626/300/200.jpg?hmac=CV2IH1nRl4I_gBb9i-gy8QzKwxWYuzHXNvPe251LTAo',
            participationRecords: [
              {
                id: '1',
                date: '2025-07-01',
                users: [
                  {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    point: 1500,
                    challengeCount: 35,
                    level: {
                      name: 'Silver',
                      code: 2,
                      exp: 2300,
                      nextLevelExp: 3000,
                    },
                  },
                ],
              },
            ],
            joinUserIds: ['1'],
            howToJoin: '비닐 대신 에코백을 사용하세요.',
            point: 300,
          },
          {
            id: '4',
            type: 0,
            typeKo: '개인',
            name: '우리동네 플로깅',
            description: '우리동네 플로깅 챌린지',
            startAt: '2025-07-01',
            endAt: '2025-07-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/170/300/200.jpg?hmac=N5CTF48skNY31DQfN6Wpg-EQTD2YzHwFrh2tQRLkgyQ',
            participationRecords: [],
            joinUserIds: [],
            howToJoin: '플로깅을 하세요.',
            point: 300,
          },
        ],
        joinChallenge: (challengeId: string, user: User) => {
          set((state) => ({
            challenges: state.challenges.map((c) =>
              c.id === challengeId && c.type === 0
                ? { ...c, joinUserIds: [...c.joinUserIds, user.id] }
                : c,
            ),
          }))
        },
      }),
      {
        name: 'apiServerMockingStore',
      },
    ),
  ),
)
