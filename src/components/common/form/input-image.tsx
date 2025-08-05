import React, { ComponentProps } from 'react'
import { imagesApi } from '@/api/images'
import { toast } from 'sonner'

interface InputProfileImageProps
  extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  value: string | null
  onChange: (src: string | null) => void
  onChangePreview?: (src: string) => void
  purpose: Parameters<typeof imagesApi.uploadImage>[0]
}

function InputImage({
  onChange: onChange,
  onChangePreview,
  purpose,
  ...restProps
}: InputProfileImageProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const processingObjectURL = URL.createObjectURL(file)
      onChangePreview?.(processingObjectURL)
      imagesApi.uploadImage(purpose, file).then((res) => {
        URL.revokeObjectURL(processingObjectURL)
        if (!res.success) {
          toast.error(res.message)
          return
        }
        onChange(res.result)
      })
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      {...restProps}
      value={restProps.value ?? undefined}
    />
  )
}

export default InputImage
