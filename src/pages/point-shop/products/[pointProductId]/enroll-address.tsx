import { ChevronLeft } from 'lucide-react'
import AddressInput, { AddressState } from '../../../../components/common/form/AddressInput'
import { useCallback, useState } from 'react'
import { Input } from '../../../../components/ui/input'
import InputLabel from '../../../../components/common/form/InputLabel'
import BottomNavigation from '../../../../components/common/BottomNavigation'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { addressApi } from '@/api/address'
import { ServerPostAddress } from '@/types/addresses'

interface FormData {
  name: string
  phone: string
  address: AddressState
}

const EnrollAddress = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPath = location.state?.from

  const mode = searchParams.get('mode') || 'add'
  const isEditMode = mode === 'edit'

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: null,
  })

  const handleBackButtonClick = () => {
    if (fromPath) {
      console.log(fromPath)
      navigate(fromPath)
    } else {
      window.history.back()
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleAddressChange = useCallback((address: AddressState) => {
    setFormData((prev) => ({
      ...prev,
      address,
    }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.')
      return
    }

    if (!formData.phone.trim()) {
      alert('전화번호를 입력해주세요.')
      return
    }

    if (!formData.address) {
      alert('주소를 입력해주세요.')
      return
    }

    const serverAddressForm: ServerPostAddress = {
      recipientName: formData.name,
      phoneNumber: formData.phone,
      roadAddress: formData.address.roadAddress,
      detailAddress: formData.address.detailAddress,
      zipCode: formData.address.zonecode,
    }

    addressApi.saveAddress(serverAddressForm)
    navigate(fromPath)
  }

  return (
    <div className="w-full bg-white">
      <div className="flex min-h-[50px] flex-shrink-0 flex-row items-center gap-30 p-[20px]">
        <ChevronLeft size={24} onClick={handleBackButtonClick} />
        <div className="text-xl text-black">{isEditMode ? '주소지 수정' : '주소지 추가'}</div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="flex-1 p-[16px] text-start">
          <InputLabel required={true}>이름</InputLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputLabel required={true}>전화번호</InputLabel>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <InputLabel required={true}>주소</InputLabel>
          <AddressInput value={formData.address} onChange={handleAddressChange} />
        </div>
        <div className="mt-70 mb-5 flex flex-shrink-0 justify-center p-4">
          <button
            type="submit"
            className="rounded-[8px] bg-green-600 px-[138px] py-[14px] text-white"
            onClick={handleSubmit}
          >
            저장하기
          </button>
        </div>
      </form>
      <BottomNavigation />
    </div>
  )
}

export default EnrollAddress
