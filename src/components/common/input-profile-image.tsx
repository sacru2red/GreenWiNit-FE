import React, { ComponentProps, useState } from 'react'
import LogoIcon from '@/components/common/LogoIcon'
import { imagesApi } from '@/api/images'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface InputProfileImageProps
  extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  value: string | null
  onChange: (src: string | null) => void
}

function InputProfileImage({
  value: prevSource,
  onChange: onChange,
  ...restProps
}: InputProfileImageProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const source = prevSource ?? null
  const [innerState, setInnerState] = useState<{ uploading: boolean; src: string | null }>({
    uploading: false,
    src: source,
  })

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setInnerState({ uploading: true, src: URL.createObjectURL(file) })
      imagesApi.uploadImage('profile', file).then((res) => {
        setInnerState({ uploading: false, src: res.result })
        if (!res.success) {
          toast.error(res.message)
          return
        }
        onChange(res.result)
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex w-fit items-center justify-center rounded-full bg-white shadow-md"
    >
      <div className="h-[92px] w-[92px] overflow-hidden rounded-full">
        {innerState.src == null ? (
          <LogoIcon size="large" className="cursor-pointer" />
        ) : (
          <img
            src={innerState.src}
            alt="프로필 이미지"
            className="h-full w-full object-scale-down"
          />
        )}
      </div>
      <img
        src="/icons/camera.svg"
        alt="사진 업로드"
        width={24}
        height={24}
        className="absolute right-0 bottom-0"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        {...restProps}
        className={cn('hidden', restProps.className)}
      />
    </button>
  )
}

export default InputProfileImage
