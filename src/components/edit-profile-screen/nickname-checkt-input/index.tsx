import { UseFormRegister } from 'react-hook-form'
import CurrentNickname from './current-nickname'
import InputNickname from './input-nickname'
import { FormState } from '@/components/edit-profile-screen/edit-profile-form'
import { Dispatch, SetStateAction } from 'react'

interface NicknameCheckInputProps {
  register: UseFormRegister<FormState>
  setIsNicknameChecked: Dispatch<SetStateAction<boolean>>
}

function NicknameCheckInput({ register, setIsNicknameChecked }: NicknameCheckInputProps) {
  return (
    <section className="flex w-full flex-col gap-2">
      <CurrentNickname />
      <InputNickname
        {...register('nickname')}
        setIsNicknameChecked={setIsNicknameChecked}
        mode="edit"
      />
    </section>
  )
}

export default NicknameCheckInput
