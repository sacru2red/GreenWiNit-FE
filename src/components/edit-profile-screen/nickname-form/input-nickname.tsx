import Required from '@/components/common/Required'
import { Fragment, useId } from 'react'

interface InputNicknameProps {
  mode?: 'new' | 'edit'
}

const InputNickname = ({ mode = 'new' }: InputNicknameProps) => {
  const id = useId()

  const checkNicknameDuplication = () => {
    // 닉네임 중복 확인 api 연결 예정
  }

  const labelContent =
    mode === 'new' ? (
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
      <div className="focus-within:border-mountain_meadow mt-2 flex w-full justify-between overflow-hidden rounded-md border border-gray-300 px-3 py-1">
        <input
          id={id}
          type="text"
          placeholder={mode === 'new' ? '새 닉네임을 입력해주세요.' : '닉네임 입력'}
          // 중복체크 안되었을 떄에는 keydown 막고, 체크 되었으면 keydown 허용해서 enter 치면 모달 띄우게 할 예정
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') e.preventDefault()
          // }}
          className="flex-1 bg-white py-3 text-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={checkNicknameDuplication}
          className="hover:bg-mountain_meadow rounded-md bg-gray-300 px-8 text-sm text-white"
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
