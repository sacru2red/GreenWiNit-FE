import { InfoCard } from '@/pages/InformationShare'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const informationsApi = {
  getInformations: async () => {
    const response = await fetch('/api/user/info')
    const data = (await response.json()) as InfoCard[]
    return data
  },

  getInformation: async (infoId: number | undefined) => {
    const response = await fetch(`/api/user/info/${infoId}`)
    const data = (await response.json()) as InfoCard
    return data
  },
}

const informationsKey = createQueryKeys('informations', {
  list: () => ['list'] as const,
  detail: (id: number | undefined) => ['detail', id] as const,
})

export const informationQueryKeys = informationsKey
