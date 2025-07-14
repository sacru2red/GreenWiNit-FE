import { useState } from 'react'

function WithDrawCaution() {
  const [isCautionClicked, setIsCautionClicked] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-4 py-6 text-start">
      <h3 className="font-bold">탈퇴 유의사항</h3>
      <p className="text-lighter-gray text-xs">내용 추후 전달 받기로 함</p>
      <div className="flex gap-3">
        <button
          onClick={() => setIsCautionClicked((isChecked) => !isChecked)}
          className="border-lighter-gray-border flex size-5 items-center justify-center rounded-sm border"
        >
          {isCautionClicked && (
            <img src="/icons/ic_check.svg" width={14} height={14} alt="체크 표시" />
          )}
        </button>
        <span className="text-secondary-foreground flex-1 text-xs">
          위 내용을 모두 확인했으며, 탈퇴에 동의합니다.
        </span>
      </div>
    </section>
  )
}

export default WithDrawCaution
