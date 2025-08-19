import Required from '@/components/common/required'
import { WithDrawnFormState } from '@/types/withdraw'
import { UseFormRegister } from 'react-hook-form'

interface WithdrawReasonFieldProps {
  register: UseFormRegister<WithDrawnFormState>
}

function WithdrawReasonField({ register }: WithdrawReasonFieldProps) {
  return (
    <section className="flex flex-col gap-4 px-4 py-6">
      <h3 className="flex items-center self-start font-bold">
        탈퇴 이유를 선택해주세요 <Required />
      </h3>
      <ul className="flex flex-col gap-5">
        {reasons.map((el, index) => (
          <li key={index}>
            <label className="relative flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="peer hidden"
                value={el.name}
                {...register('reasonTypes', {
                  validate: (v) =>
                    (Array.isArray(v) && v.length > 0) || '탈퇴 이유를 하나 이상 선택해주세요.',
                })}
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#DDDDDD] peer-checked:border-[#3A9B6E]" />
              <img
                src="/icons/check.svg"
                alt="선택됨"
                className="absolute top-1/2 left-[3px] hidden -translate-y-1/2 peer-checked:block"
              />
              <span className="text-secondary-foreground">{el.content}</span>
            </label>
            {el.name === 'OTHER' && (
              <textarea
                className="placeholder:text-lighter-gray mt-5 h-24 w-full resize-none rounded-md border border-[#DDDDDD] bg-[#f9f9f9] p-3 placeholder:text-sm focus:outline-none"
                placeholder="기타 이유를 입력해주세요"
                {...register('customReason', {
                  validate: (value, formValues) => {
                    const list = Array.from(formValues.reasonTypes)
                    return list.includes('OTHER')
                      ? !!value?.trim() || '기타 이유를 입력해주세요.'
                      : true
                  },
                })}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

const reasons = [
  { name: 'SERVICE_DISSATISFACTION', content: '서비스 이용이 불편해요' },
  { name: 'POLICY_DISAGREEMENT', content: '원하는 정보가 없어요' },
  { name: 'PRIVACY_CONCERN', content: '다른 서비스를 이용할 예정이에요' },
  { name: 'PRIVACY_PROTECTION', content: '개인정보 보호를 위해 탈퇴할게요' },
  { name: 'OTHER', content: '기타' },
] as const

export default WithdrawReasonField
