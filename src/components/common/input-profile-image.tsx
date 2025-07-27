import React, { useState } from 'react'
import LogoIcon from '@/components/common/LogoIcon'

interface InputProfileImageProps {
  src: string | null
  setSrc: (src: string | null) => void
}

// @TODO call setSrc when upload is done
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InputProfileImage({ src: prevSource, setSrc }: InputProfileImageProps) {
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
      // @TODO call uploading API
    }
  }

  return (
    <div className="flex w-full">
      <button
        type="button"
        onClick={handleClick}
        className="relative flex items-center justify-center rounded-full bg-white shadow-md"
      >
        <div className="h-[92px] w-[92px] overflow-hidden rounded-full">
          {innerState.src == null ? (
            <LogoIcon size="large" className="cursor-pointer" onClick={handleClick} />
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
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default InputProfileImage
