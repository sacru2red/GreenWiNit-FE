import CurrentNickname from './current-nickname'
import InputNickname from './input-nickname'

function NicknameCheckInput() {
  return (
    <section className="flex w-full flex-col gap-2">
      <CurrentNickname />
      <InputNickname />
    </section>
  )
}

export default NicknameCheckInput
