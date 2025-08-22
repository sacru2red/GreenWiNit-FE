import { API_URL } from '@/constant/network'
import { ApiResponse } from '@/types/api'

export const imagesApi = {
  uploadImage: async (
    purpose: 'challenge' | 'challenge-cert' | 'info' | 'product' | 'profile',
    file: File,
  ) => {
    const formData = new FormData()
    formData.append('imageFile', file)
    const response = await fetch(`${API_URL}/images?purpose=${purpose}`, {
      method: 'POST',
      body: formData,
    })
    return response.json() as Promise<ApiResponse>
  },
}
