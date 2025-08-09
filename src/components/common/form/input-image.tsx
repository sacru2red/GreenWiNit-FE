import React, { ComponentProps } from 'react'
import { imagesApi } from '@/api/images'
import { toast } from 'sonner'
import { omit } from 'es-toolkit'
import { cn } from '@/lib/utils'

interface InputProfileImageProps
  extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  localFileName: string | null
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
        // 선택 후 다시 같은 파일 선택 가능하게 초기화하려면:
        if (e.target) e.target.value = ''
      })
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      {...omit(restProps, ['localFileName'])}
      className={cn(restProps.className, 'cursor-pointer')}
    />
  )
}

InputImage.displayName = 'InputImage'
export default InputImage
