const CurrentNickname = () => {
  return (
    <fieldset>
      <legend className="sr-only">현재 닉네임</legend>
      <label
        htmlFor="current-nickname"
        className="text-secondary-foreground block text-start text-sm"
      >
        현재 닉네임
      </label>
      <input
        type="text"
        id="current-nickname"
        name="current-nickname"
        placeholder="현재 닉네임을 입력해주세요"
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
        className="text-secondary-foreground mt-2 h-[48px] w-full rounded-sm bg-[#F5F5F5] px-4 py-3 focus:outline-none"
      />
    </fieldset>
  )
}

export default CurrentNickname
