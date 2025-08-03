import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from './auth-store'
import { ClientAddress } from '@/types/addresses'
import { serverToClientAddress } from '@/lib/utils'
import { ProdcutDetailType, Product } from '@/types/product'
import { Challenge } from '@/mocks/handlers'

/**
 * 이 파일은 추후에 삭제되어야 합니다.
 */

interface ApiServerMockingState {
  users: User[]
  challenges: Challenge[]
  joinChallenge: (challengeId: string, user: User) => void
  deleteTeam: (teamId: string) => void

  address: ClientAddress
  getAddress: () => ClientAddress | null
  enrollAddress: (newAddress: ClientAddress) => void
  updateAddress: (updatedAddress: Partial<ClientAddress>) => void

  products: Product[]
  getProducts: () => Product[]
  detailProduct: ProdcutDetailType[]
  getProductDetail: (productId: number) => ProdcutDetailType | undefined
}

const ME = {
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
} satisfies User

export const apiServerMockingStore = create<ApiServerMockingState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [ME],
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
          {
            id: '5',
            type: 1,
            typeKo: '팀',
            name: '팀 참여하기 테스트',
            description: '팀 참여하기 테스트 챌린지',
            startAt: '2025-08-01',
            endAt: '2025-08-31',
            status: 0,
            statusKo: '모집중',
            thumbnailUrl:
              'https://fastly.picsum.photos/id/535/300/200.jpg?hmac=-vf_P6g5M_OnP4JRh2lbjlkmkEm7CgcjtHZvJfRshEE',
            teams: [
              {
                id: '1',
                name: '참여중인 팀의 이름',
                date: '2025-08-01',
                startAt: '2025-08-01',
                endAt: '2025-08-31',
                address: {
                  roadAddress: '경기 성남시 분당구 판교역로 166',
                  roadnameCode: '3179025',
                  zonecode: '13529',
                  detailAddress: '101동 203호',
                  sigungu: '성남시 분당구',
                },
                description: '팀 1 설명',
                maxMemberCount: 1,
                openChatUrl: 'https://open.kakao.com/o/1234567890',
                users: [],
              },
            ],
            joinUserIds: ['1'],
            howToJoin: '',
            point: 200,
          },
        ],
        joinChallenge: (challengeId: string, user: User) => {
          set((state) => ({
            challenges: state.challenges.map((c) =>
              c.id === challengeId ? { ...c, joinUserIds: [...c.joinUserIds, user.id] } : c,
            ),
          }))
        },
        deleteTeam: (teamId: string) => {
          set((state) => ({
            challenges: state.challenges.map((c) =>
              c.type === 1 && c.teams.some((t) => t.id === teamId)
                ? {
                    ...c,
                    teams: c.teams.map((t) => (t.id === teamId ? { ...t, isDeleted: true } : t)),
                  }
                : c,
            ),
          }))
        },

        address: serverToClientAddress({
          deliveryAddressId: 1,
          recipientName: '홍길동',
          phoneNumber: '010-1234-5678',
          roadAddress: '00시 00구 00로 11',
          detailAddress: '1층',
          zipCode: '12345',
        }),
        getAddress: (): ClientAddress | null => {
          return get().address
        },
        enrollAddress: (newAddress: ClientAddress) => {
          set({ address: newAddress })
        },

        updateAddress: (updatedAddress: Partial<ClientAddress>) => {
          const currentAddress = get().address
          const newAddress = {
            ...currentAddress,
            ...updatedAddress,
            address: updatedAddress.address
              ? { ...currentAddress.address, ...updatedAddress.address }
              : currentAddress.address,
          }

          set({ address: newAddress })
        },

        products: [
          {
            pointProductId: 1,
            pointProductName: '에코 텀블러',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1200,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 2,
            pointProductName: '에코 백',
            thumbnailUrl: '/img/2.png',
            pointPrice: 850,
            sellingStatus: '품절',
          },
          {
            pointProductId: 3,
            pointProductName: '대나무 칫솔 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 600,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 4,
            pointProductName: '재사용 빨대 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 450,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 5,
            pointProductName: '친환경 노트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 300,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 6,
            pointProductName: '유리 물병',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1500,
            sellingStatus: '교환가능',
          },
          {
            pointProductId: 7,
            pointProductName: '대나무 도시락',
            thumbnailUrl: '/img/2.png',
            pointPrice: 2000,
            sellingStatus: '품절',
          },
          {
            pointProductId: 8,
            pointProductName: '친환경 세제',
            thumbnailUrl: '/img/2.png',
            pointPrice: 800,
            sellingStatus: '교환가능',
          },
        ],
        getProducts: () => {
          return get().products
        },
        detailProduct: [
          {
            pointProductId: 1,
            pointProductName: '에코 텀블러',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1200,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 5,
          },
          {
            pointProductId: 2,
            pointProductName: '에코 백',
            thumbnailUrl: '/img/2.png',
            pointPrice: 850,
            sellingStatus: '품절',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 3,
          },
          {
            pointProductId: 3,
            pointProductName: '대나무 칫솔 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 600,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 12,
          },
          {
            pointProductId: 4,
            pointProductName: '재사용 빨대 세트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 450,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 11,
          },
          {
            pointProductId: 5,
            pointProductName: '친환경 노트',
            thumbnailUrl: '/img/2.png',
            pointPrice: 300,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 2,
          },
          {
            pointProductId: 6,
            pointProductName: '유리 물병',
            thumbnailUrl: '/img/2.png',
            pointPrice: 1500,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 5,
          },
          {
            pointProductId: 7,
            pointProductName: '대나무 도시락',
            thumbnailUrl: '/img/2.png',
            pointPrice: 2000,
            sellingStatus: '품절',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 8,
          },
          {
            pointProductId: 8,
            pointProductName: '친환경 세제',
            thumbnailUrl: '/img/2.png',
            pointPrice: 800,
            sellingStatus: '교환가능',
            description:
              '친환경 스테인리스 텀블러는 일회용 컵 사용을 줄이고 환경을 보호하는 데 도움이 됩니다.',
            stockQuantity: 9,
          },
        ],
        getProductDetail: (productId: number) => {
          const findProduct = get().detailProduct.find(
            (product) => product.pointProductId === productId,
          )
          return findProduct
        },
      }),
      {
        name: 'apiServerMockingStore',
      },
    ),
  ),
)
