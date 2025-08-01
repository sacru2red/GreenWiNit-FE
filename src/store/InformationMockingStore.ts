import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type InfoCard = {
  id: number
  infoCategoryName: string
  title: string
  thumbnailUrl: string
  content: string
}

interface InformationMockingStore {
  informations: InfoCard[]
  getInformations: () => InfoCard[]
  getInformationById: (id: number) => InfoCard | undefined
}

const infoCardData: InfoCard[] = [
  {
    id: 1,
    infoCategoryName: '이벤트',
    title: '친환경적인 일상 실천하기',
    thumbnailUrl: '/img/2.png',
    content: '친환경 실천 방법에 대한 내용입니다.',
  },
  {
    id: 2,
    infoCategoryName: '이벤트',
    title: '제로웨이스트 워크숍',
    thumbnailUrl: '/img/2.png',
    content:
      '일상에서 쓰레기를 줄이는 방법을 배우는 워크숍입니다. 친환경 생필용품을 직접 만들어보고, 제로웨이스트 라이프 스타일을 함께 해봐요.',
  },
  {
    id: 3,
    infoCategoryName: '커뮤니티',
    title: '친환경 제품 만들기',
    thumbnailUrl: '/img/2.png',
    content: '버려지는 물건으로 새로운 가치를 만드는 업사이클링 DIY 클래스입니다.',
  },
  {
    id: 4,
    infoCategoryName: '커뮤니티',
    title: '제로 피크닉',
    thumbnailUrl: '/img/2.png',
    content: '일회용품 없이 즐기는 친환경 피크닉 모임입니다.',
  },
  {
    id: 5,
    infoCategoryName: '기타',
    title: '친환경 마켓',
    thumbnailUrl: '/img/2.png',
    content: '지속가능한 생활을 위한 친환경 제품들을 만나볼 수 있는 마켓입니다.',
  },
  {
    id: 6,
    infoCategoryName: '이벤트',
    title: '업사이클링 워크숍',
    thumbnailUrl: '/img/2.png',
    content: '버려지는 물건에 새 생명을 불어넣는 업사이클링 워크숍입니다.',
  },
]

export const InformationMockingStore = create<InformationMockingStore>()(
  devtools(
    (set, get) => ({
      informations: infoCardData,

      getInformations: () => get().informations,

      getInformationById: (id: number) => get().informations.find((info) => info.id === id),

      setInformations: (informations: InfoCard[]) => set({ informations }),
    }),
    {
      name: 'information-store',
    },
  ),
)
