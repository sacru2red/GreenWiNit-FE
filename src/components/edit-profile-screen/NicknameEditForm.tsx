import SubmitEditButton from '@/components/edit-profile-screen/SubmitEditButton'

function NicknameEditForm() {
  return (
    <section className="w-full flex-1 px-4 py-6">
      <form action="submit">
        <label htmlFor="current-nickname" className="block">
          <span className="text-secondary-foreground block text-start text-sm">현재 닉네임</span>
          <input
            type="text"
            id="current-nickname"
            name="current-nickname"
            placeholder="현재 닉네임을 입력해주세요"
            className="text-secondary-foreground mt-2 h-[48px] w-full rounded-sm bg-[#F5F5F5] px-4 py-3 focus:outline-none"
          />
        </label>

        <label htmlFor="new-nickname" className="relative mt-6 block">
          <span className="text-secondary-foreground block text-start text-sm">변경할 닉네임</span>
          <input
            type="text"
            id="new-nickname"
            name="new-nickname"
            placeholder="새 닉네임을 입력해주세요"
            className="border-lighter-gray-border placeholder:text-lighter-gray mt-2 h-[48px] w-full rounded-sm border bg-[#FFFFFF] px-4 py-3 focus:outline-none"
          />
          <button className="active:bg-mountain_meadow absolute top-[34px] right-3 flex h-[36px] w-[106px] items-center justify-center rounded-sm bg-[#C0C0C0] text-sm text-white">
            중복 확인
          </button>
        </label>

        <span className="text-lighter-gray mt-2 block text-start text-xs">
          2~20자 이내, 특수문자 사용 불가
        </span>

        <SubmitEditButton />
      </form>
    </section>
  )
}

export default NicknameEditForm
