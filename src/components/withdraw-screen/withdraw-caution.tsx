function WithDrawCaution({ setChecked }: { setChecked: (isChecked: boolean) => void }) {
  return (
    <section className="flex flex-col gap-4 px-4 py-6 text-start">
      <h3 className="font-bold">탈퇴 유의사항</h3>
      <p className="text-lighter-gray text-xs">내용 추후 전달 받기로 함</p>
      <label className="relative flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="peer hidden"
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#DDDDDD] peer-checked:border-[#3A9B6E]" />
        <img
          src="/icons/check.svg"
          alt="선택됨"
          className="absolute top-1/2 left-[3px] hidden -translate-y-1/2 peer-checked:block"
        />
        <span className="text-secondary-foreground flex-1 text-xs">
          위 내용을 모두 확인했으며, 탈퇴에 동의합니다.
        </span>
      </label>
    </section>
  )
}

export default WithDrawCaution
