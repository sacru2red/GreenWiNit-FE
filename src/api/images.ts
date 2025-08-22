import { API_URL } from '@/constant/network'
import { showMessageIfExists } from '@/lib/error'
import { throwResponseStatusThenChaining } from '@/lib/network'
import { ApiResponse } from '@/types/api'

export const imagesApi = {
  uploadImage: async (
    purpose: 'challenge' | 'challenge-cert' | 'info' | 'product' | 'profile',
    file: File,
  ) => {
    const formData = new FormData()
    formData.append('imageFile', file)
    return fetch(`${API_URL}/images?purpose=${purpose}`, {
      method: 'POST',
      body: formData,
    })
      .then(throwResponseStatusThenChaining)
      .then((res) => res.json() as Promise<ApiResponse>)
      .catch(showMessageIfExists)
  },
}
