import AddressInput, { AddressState } from '../../../../components/common/form/address-input'
import { useState } from 'react'
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '@/components/common/form/error-message'

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

  const { register, handleSubmit, control, formState } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: null,
    },
  })
  const errors = formState.errors
  const [isModalOpen, setIsModalOpen] = useState(false)

  const submitHandler: SubmitHandler<FormData> = (formData) => {
    if (formData.address === null) {
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
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-1 flex-col p-4">
          <div className="flex flex-col text-start">
            <InputLabel required={true}>이름</InputLabel>
            <Input type="text" {...register('name', { required: '이름을 입력해주세요.' })} />
            <ErrorMessage name="name" errors={errors} />
            <InputLabel required={true}>전화번호</InputLabel>
            <Input
              type="text"
              placeholder="010-XXXX-XXXX"
              inputMode="tel"
              {...register('phone', { required: '전화번호를 입력해주세요.' })}
            />
            <ErrorMessage name="phone" errors={errors} />
            <InputLabel required={true}>주소</InputLabel>
            {/* <AddressInput {...register('address', { required: '주소를 입력해주세요.' })} /> */}
            <Controller
              control={control}
              name="address"
              rules={{ required: '주소를 입력해주세요.' }}
              render={({ field }) => <AddressInput {...field} />}
            />
            <ErrorMessage name="address" errors={errors} />
          </div>
          <Button type="submit" className="mt-auto">
            저장하기
          </Button>
        </form>
      )}
      <BottomNavigation />
    </PageContainer>
  )
}

export default EnrollAddress
