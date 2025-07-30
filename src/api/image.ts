import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

type Purpose = 'challenge' | 'challenge-cert' | 'info' | 'product' | 'profile'

export const imageApi = {
  uploadImages: async (file: File, purpose: Purpose) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`/api/images?purpose=${purpose}`, {
      method: 'POST',
      body: formData,
    })

    return response.json() as Promise<UploadImagesResponse>
  },
}

interface UploadImagesResponse {
  success: boolean
  message: string
  result: string
}

const imagesKey = createQueryKeys('images')

const imagesUploadKey = createQueryKeys('upload', {
  upload: (purpose: Purpose) => [purpose] as const,
})

export const imageQueryKeys = mergeQueryKeys(imagesKey, imagesUploadKey)
