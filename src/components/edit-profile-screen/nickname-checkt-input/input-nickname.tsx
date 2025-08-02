import { usersApi } from '@/api/users'
import Required from '@/components/common/required'
import {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  Fragment,
  SetStateAction,
  useId,
  useState,
} from 'react'
import { toast } from 'sonner'

type InputNicknameProps = {
  mode?: 'new' | 'edit'
  setIsNicknameChecked?: Dispatch<SetStateAction<boolean>>
} & ComponentProps<'input'>

const InputNickname = ({ mode = 'new', setIsNicknameChecked, ...props }: InputNicknameProps) => {
  const [innerValue, setInnerValue] = useState('')
  const id = useId()

  const checkNicknameDuplication = async () => {
    if (mode === 'new') return

    const res = await usersApi.checkNicknameDuplicate(innerValue)
    console.log(res)

    if (res.type === 'success') {
      setIsNicknameChecked(true)
      toast.success('사용 가능한 닉네임입니다.')
    } else {
      setIsNicknameChecked(false)
      toast.error('중복된 닉네임이 존재합니다.')
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value)
  }

  const labelContent =
    mode === 'edit' ? (
      '변경할 닉네임'
    ) : (
      <Fragment>
        닉네임
        <Required />
      </Fragment>
    )

  return (
    <fieldset>
      <legend className="sr-only">{labelContent}</legend>
      <label htmlFor={id} className="text-secondary-foreground block text-start text-sm">
        {labelContent}
      </label>
      <div className="focus-within:border-mountain_meadow mt-2 flex w-full justify-between overflow-hidden rounded-md border border-gray-300 bg-white">
        <input
          id={id}
          type="text"
          placeholder={mode === 'new' ? '새 닉네임을 입력해주세요.' : '닉네임 입력'}
          className="flex-1 px-3 py-4 text-sm focus:outline-none"
          {...props}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={checkNicknameDuplication}
          className="hover:bg-mountain_meadow rounded-r-md bg-gray-300 px-8 text-sm text-white"
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
