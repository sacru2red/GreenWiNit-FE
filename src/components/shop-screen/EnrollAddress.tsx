import { ChevronLeft } from 'lucide-react'
import AddressInput, { AddressState } from '../common/form/AddressInput'
import { useState } from 'react'

const EnrollAddress = () => {
  const [address, setAddress] = useState<AddressState | null>(null)

  return (
    <div className="w-full">
      <div className="flex min-h-[50px] flex-row items-center">
        <ChevronLeft size={24} />
        <div className="text-xl text-black">배송지 정보 수정</div>
      </div>
      <div>
        <AddressInput value={address} onChange={setAddress} />
      </div>
    </div>
  )
}

export default EnrollAddress
