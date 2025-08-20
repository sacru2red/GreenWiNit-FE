import { usersApi } from '@/api/users'
import Required from '@/components/common/required'
import { ComponentPropsWithRef, useId } from 'react'
import { toast } from 'sonner'

type InputNicknameProps = {
  mode?: 'new' | 'edit'
  setIsNicknameDuplicated: (isChecked: boolean) => void
  setHasTriedDuplicateCheck: (isTrying: boolean) => void
} & ComponentPropsWithRef<'input'>

const InputNickname = ({ mode = 'new', setIsNicknameDuplicated, ...props }: InputNicknameProps) => {
  const id = useId()

  const labelContent =
    mode === 'edit' ? (
      '변경할 닉네임'
    ) : (
      <>
        닉네임
        <Required />
      </>
    )

  const handleClick = async () => {
    const nickname = props.value as string

    // 1. 빈값 검사
    if (!nickname) {
      toast.error('닉네임을 입력해 주세요.')
      return
    }

    // 2. 띄어쓰기 검사
    if (/\s/.test(nickname)) {
      toast.error('띄어쓰기를 포함할 수 없습니다.')
      return
    }

    // 3. 길이 제한 검사
    if (nickname.length > 20) {
      toast.error('닉네임은 20자 이내로 입력해주세요.')
      return
    }

    // 4. 특수문자/이모지 검사
    if (!/^[\p{L}\p{N}]+$/u.test(nickname)) {
      toast.error('특수문자와 이모지는 사용할 수 없습니다.')
      return
    }

    const res = await usersApi.checkNicknameDuplicate(nickname)

    if ('nickname' in res && res.available) {
      setIsNicknameDuplicated(false)
      toast.success('사용 가능한 닉네임입니다.')
    } else {
      setIsNicknameDuplicated(true)
      toast.error('중복된 닉네임이 존재합니다.')
    }
  }

  return (
    <fieldset>
      <legend className="sr-only">{labelContent}</legend>
      <label htmlFor={id} className="text-secondary-foreground block text-start text-sm">
        {labelContent}
      </label>
      <div className="focus-within:border-mountain_meadow mt-2 flex w-full justify-between overflow-hidden rounded-md border border-gray-300 bg-white">
        <input
          ref={props.ref}
          id={id}
          type="text"
          placeholder="새 닉네임을 입력해주세요."
          className="flex-1 px-3 py-4 text-sm focus:outline-none"
          {...props}
        />
        <button
          type="button"
          onClick={handleClick}
          className="hover:bg-mountain_meadow/80 bg-mountain_meadow rounded-r-md px-8 text-sm text-white"
        >
          중복 확인
        </button>
      </div>
      <span className="text-lighter-gray mt-2 block text-start text-xs">
        2~20자 이내, 특수문자 사용 불가
      </span>
    </fieldset>
  )
}

export default InputNickname
