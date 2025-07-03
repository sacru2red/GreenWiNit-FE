import PlusIcon from '@mui/icons-material/Add'
import { ForwardedRef, Fragment, useEffect, useRef } from 'react'
import { omit } from 'es-toolkit'
import { cn } from '@/lib/utils'

const InputUploadImage = (
  props: Omit<React.ComponentProps<'input'>, 'value'> & { value: File | null },
) => {
  const inputRef = useRef<HTMLInputElement>(
    props.ref && typeof props.ref === 'object' && 'current' in props.ref ? props.ref.current : null,
  )
  const mergedRef = mergeRefs(props.ref, inputRef)

  const imageBlob = inputRef.current?.files?.[0]

  useEffect(() => {
    console.log('imageBlob 2', imageBlob)
    if (imageBlob == null) {
      return
    }
  }, [imageBlob])

  return (
    <div
      className={cn(
        'flex min-h-[15vh] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl',
        imageBlob == null ? 'bg-[#f0f0f0] p-4' : 'max-h-[20vh]',
      )}
      onClick={() => inputRef.current?.click()}
    >
      {imageBlob == null ? (
        <Fragment>
          <div className="rounded-full border-[2px] border-[#3A9B6E] p-2">
            <PlusIcon htmlColor="#3A9B6E" />
          </div>
          <span className="text-bold text-[#666666]">이미지를 업로드 해주세요.</span>
          <span className="text-sm text-[#999999]">권장 크기: 1200 x 800px</span>
        </Fragment>
      ) : (
        <img src={URL.createObjectURL(imageBlob)} alt="uploaded" className="min-h-[15vh]" />
      )}
      <input type="file" className="hidden" {...omit(props, ['value'])} ref={mergedRef} />
    </div>
  )
}

function mergeRefs<T>(...refs: (ForwardedRef<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    })
  }
}

export default InputUploadImage
