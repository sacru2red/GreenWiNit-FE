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
        // @CHECK
        // 이 컴포넌트는 입력값을 받는게 아닌 것 같습니다.
        // props로 현재 닉네임 값을 받아 표시하고, 입력값은 받지 않는 readonly, not editable 로 설정해야 할 것 같습니다.
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
