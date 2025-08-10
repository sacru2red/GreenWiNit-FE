import AddressInput, { AddressState } from '../../../../components/common/form/address-input'
import { useCallback, useState } from 'react'
import { Input } from '../../../../components/ui/input'
import InputLabel from '../../../../components/common/form/input-label'
import BottomNavigation from '../../../../components/common/bottom-navigation'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addressApi } from '@/api/address'
import { UpdateAddressDto } from '@/types/addresses'
import PageContainer from '@/components/common/page-container'
import PageHeaderSection from '@/components/common/page-header-section'
import PageTitle from '@/components/common/page-title'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface FormData {
  name: string
  phone: string
  address: AddressState
}

const EnrollAddress = () => {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'add'
  const isEditMode = mode === 'edit'
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: null,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const hasAddress = Boolean(formData.address && formData.name && formData.phone)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!hasAddress || formData.address === null) {
      toast.error('배송지 정보를 입력해주세요.')
      return
    }

    const serverAddressForm: UpdateAddressDto = {
      recipientName: formData.name,
      phoneNumber: formData.phone,
      roadAddress: formData.address.roadAddress,
      detailAddress: formData.address.detailAddress,
      zipCode: formData.address.zonecode,
    }

    addressApi.saveAddress(serverAddressForm)
    setIsModalOpen((prev) => !prev)
  }

  const handleConfirm = () => {
    navigate(-1)
  }

  return (
    <PageContainer>
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>{isEditMode ? '주소지 수정' : '주소지 추가'}</PageTitle>
      </PageHeaderSection>
      {isModalOpen === true ? (
        <ConfirmDialog
          isOpen={isModalOpen}
          description="배송지 저장이 완료되었습니다."
          paragraph="이제 상품을 교환할 수 있습니다!"
          setIsOpen={setIsModalOpen}
          onConfirm={handleConfirm}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-4">
          <div className="flex flex-col text-start">
            <InputLabel required={true}>이름</InputLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="pt-2">
              {!formData.name.trim() && (
                <span className="bg-red-500 pt-2 text-start text-sm">이름을 입력해주세요.</span>
              )}
            </div>
            <InputLabel required={true}>전화번호</InputLabel>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="010-XXXX-XXXX"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <div className="pt-2">
              {!formData.phone.trim() && (
                <span className="text-start text-sm text-red-500">전화번호를 입력해주세요.</span>
              )}
            </div>
            <InputLabel required={true}>주소</InputLabel>
            <AddressInput value={formData.address} onChange={handleAddressChange} />
            <div className="pt-2">
              {!formData.address && (
                <span className="bg-red-500 pt-2 text-start text-sm">주소를 입력해주세요.</span>
              )}
            </div>
          </div>
          <Button type="submit" onClick={handleSubmit} className="mt-auto">
            저장하기
          </Button>
        </form>
      )}
      <BottomNavigation />
    </PageContainer>
  )
}

export default EnrollAddress
