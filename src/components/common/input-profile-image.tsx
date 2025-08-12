import { ComponentProps, useRef, useState } from 'react'
import LogoIcon from '@/components/common/logo-icon'
import { cn, mergeRefs } from '@/lib/utils'
import InputImage from './form/input-image'

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
  const source = prevSource
  const [preview, setPreview] = useState<string | null>(source)
  const inputRef = useRef<HTMLInputElement>(
    restProps.ref && typeof restProps.ref === 'object' && 'current' in restProps.ref
      ? restProps.ref.current
      : null,
  )
  const mergedRef = mergeRefs(restProps.ref, inputRef)
  const hasRemoteImage = source?.startsWith('http://') || source?.startsWith('https://')

  return (
    <button
      type="button"
      className="relative flex w-fit items-center justify-center rounded-full bg-white shadow-md"
      onClick={() => inputRef.current?.click()}
    >
      <div className="h-[92px] w-[92px] overflow-hidden rounded-full">
        {hasRemoteImage && source ? (
          <img src={source} alt="프로필 이미지" className="h-full w-full object-scale-down" />
        ) : !preview ? (
          <LogoIcon size="large" className="cursor-pointer" />
        ) : (
          <img
            src={preview}
            alt="프로필 이미지 프리뷰 (업로드 전)"
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
      <InputImage
        {...restProps}
        localFileName={
          source &&
          (source?.startsWith('file://') || source?.startsWith('blob:') || source?.startsWith('/'))
            ? source
            : null
        }
        onChangePreview={setPreview}
        onChange={onChange}
        purpose="profile"
        ref={mergedRef}
        className={cn('hidden', restProps.className)}
      />
    </button>
  )
}

export default InputProfileImage
