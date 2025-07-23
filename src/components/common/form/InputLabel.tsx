import { ReactNode } from 'react'

interface InputLabelProps {
  children: ReactNode
  required: boolean
}

const InputLabel = ({ children, required }: InputLabelProps) => {
  return (
    <div className="flex flex-row pt-[32px] pb-[8px]">
      <div className="pe-[2px] text-sm text-black">{children}</div>
      {required && <span className="text-red-500">*</span>}
    </div>
  )
}

export default InputLabel
