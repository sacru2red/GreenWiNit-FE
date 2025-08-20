import { API_URL } from '@/constant/network'
import { throwResponseStatusThenChaining } from '@/lib/network'

export const imagesApi = {
  uploadImage: async (
    purpose: 'challenge' | 'challenge-cert' | 'info' | 'product' | 'profile',
    file: File,
  ) => {
    const formData = new FormData()
    formData.append('imageFile', file)
    await fetch(`${API_URL}/images?purpose=${purpose}`, {
      method: 'POST',
      body: formData,
    })
      .then(throwResponseStatusThenChaining)
      .then(
        (res) =>
          res.json() as Promise<{
            message: string
            result: string
            success: boolean
          }>,
      )
  },
}
