import { InfoCard } from '@/pages/app/InformationShare'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const informationsApi = {
  getInformations: async () => {
    const response = await fetch('/api/user/info')
    const data = response.json() as Promise<InfoCard[]>
    return data
  },

  getInformation: async (infoId: number | undefined) => {
    const response = await fetch(`/api/user/info/${infoId}`)
    const data = response.json() as Promise<InfoCard>
    return data
  },
}

const informationsKey = createQueryKeys('informations', {
  list: () => ['list'] as const,
  detail: (id: number | undefined) => ['detail', id] as const,
})

export const informationQueryKeys = informationsKey
