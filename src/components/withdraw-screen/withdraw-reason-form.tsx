import { useState } from 'react'

const reasons = [
  { name: 'ux', content: '서비스 이용이 불편해요' },
  { name: 'no-info', content: '원하는 정보가 없어요' },
  { name: 'other-service', content: '다른 서비스를 이용할 예정이에요' },
  { name: 'privacy', content: '개인정보 보호를 위해 탈퇴할게요' },
  { name: 'etc', content: '기타' },
] as const

function WithDrawReasonForm() {
  const [selected, setSelected] = useState<(typeof reasons)[number]['name'] | null>(null)

  return (
    <section className="flex flex-col gap-4 px-4 py-6">
      <h3 className="self-start font-bold">탈퇴 이유를 선택해주세요</h3>
      <ul className="flex flex-col gap-5">
        {reasons.map((el) => (
          <li>
            <label key={el.name} className="flex items-center gap-3">
              <input
                className="peer hidden"
                type="radio"
                name="withdrawReason"
                value={el.content}
                checked={selected === el.name}
                onChange={() => setSelected(el.name)}
              />
              <span className="relative size-5 rounded-full border border-[#DDDDDD]">
                {selected === el.name && (
                  <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A9B6E]"></span>
                )}
              </span>
              <span className="text-secondary-foreground">{el.content}</span>
            </label>
            {el.name === 'etc' && (
              <textarea
                className="placeholder:text-lighter-gray mt-5 h-[100px] w-full resize-none rounded-md border-1 border-[#DDDDDD] bg-[#f9f9f9] p-3 placeholder:text-sm focus:outline-none"
                placeholder="기타 이유를 입력해주세요"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WithDrawReasonForm
