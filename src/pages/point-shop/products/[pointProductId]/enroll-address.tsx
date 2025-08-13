import AddressInput, { AddressState } from '../../../../components/common/form/address-input'
import { useEffect, useState } from 'react'
import Input from '@/components/common/form/input'
import InputLabel from '../../../../components/common/form/input-label'
import BottomNavigation from '../../../../components/common/bottom-navigation'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addressApi } from '@/api/address'
import { UpdateAddressDto } from '@/types/addresses'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import ConfirmDialog from '@/components/common/modal/confirm-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '@/components/common/form/error-message'
import useAddress from '@/hooks/use-adress'

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

  const { register, handleSubmit, control, formState, setError, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: null,
    },
  })
  const errors = formState.errors
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: deliveryAddress, isLoading: addressLoading } = useAddress()

  useEffect(() => {
    if (isEditMode && deliveryAddress && !addressLoading) {
      reset({
        name: deliveryAddress.name || '',
        phone: deliveryAddress.phone || '',
        address: deliveryAddress.address || null,
      })
    }
  }, [isEditMode, deliveryAddress, addressLoading, reset])

  const submitHandler: SubmitHandler<FormData> = async (formData) => {
    if (formData.address === null) {
      toast.error('배송지 정보를 입력해주세요.')
      return
    }
    const isValidPhoneNumber =
      /^0\d{1,2}-\d{3,4}-\d{4}$/.test(formData.phone) || /^0\d{8,10}$/.test(formData.phone)
    console.log('isValidPhoneNumber', isValidPhoneNumber)
    if (!isValidPhoneNumber) {
      setError('phone', { message: '전화번호 형식에 맞지 않습니다.' })
      return
    }
    /**
     * 02-111-1234 (9)
     * 051-123-1234 (10)
     * 02-1111-1234 (10)
     * 051-1234-1234 (11)
     * 010-1234-1234 (11)
     */
    const formattedPhoneNumber = formData.phone.replace(/(\D)/g, '').replace(/^(\d)+$/, (match) => {
      console.log('match', match)
      if (match.startsWith('02')) {
        return `${match.slice(0, 2)}-${match.length === 9 ? `${match.slice(2, 5)}-${match.slice(5)}` : `${match.slice(2, 6)}-${match.slice(6)}`}`
      }
      if (match.length === 10) {
        return `${match.slice(0, 3)}-${match.slice(3, 6)}-${match.slice(6)}`
      }
      if (match.length === 11) {
        return `${match.slice(0, 3)}-${match.slice(3, 7)}-${match.slice(7)}`
      }
      return match
    })

    const serverAddressForm: UpdateAddressDto = {
      recipientName: formData.name,
      phoneNumber: formattedPhoneNumber,
      roadAddress: formData.address.roadAddress,
      detailAddress: formData.address.detailAddress,
      zipCode: formData.address.zonecode,
    }

    await addressApi
      .saveAddress(serverAddressForm)
      .then(() => {
        setIsModalOpen(true)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const handleConfirm = () => {
    navigate(-1)
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection>
        <PageLayOut.HeaderSection.BackIcon />
        <PageTitle>{isEditMode ? '배송지 정보 수정' : '배송지 정보 입력'}</PageTitle>
      </PageLayOut.HeaderSection>
      <PageLayOut.BodySection>
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-1 flex-col">
          <div className="flex flex-col text-start">
            <InputLabel required={true}>이름</InputLabel>
            <Input type="text" {...register('name', { required: '이름을 입력해주세요.' })} />
            <ErrorMessage name="name" errors={errors} />
            <InputLabel required={true}>전화번호</InputLabel>
            <Input
              type="text"
              placeholder="010-XXXX-XXXX"
              inputMode="tel"
              {...register('phone', {
                required: '전화번호를 입력해주세요.',
              })}
            />
            <ErrorMessage name="phone" errors={errors} />
            <InputLabel required={true}>주소</InputLabel>
            <Controller
              control={control}
              name="address"
              rules={{ required: '주소를 입력해주세요.' }}
              render={({ field }) => {
                console.log('주소 확인', field)
                return <AddressInput {...field} />
              }}
            />
            <ErrorMessage name="address" errors={errors} />
          </div>
          <Button type="submit" className="mt-auto">
            저장하기
          </Button>
        </form>
        {isModalOpen === true ? (
          <ConfirmDialog
            isOpen={isModalOpen}
            description="배송지 저장이 완료되었습니다."
            paragraph="이제 상품을 교환할 수 있습니다!"
            setIsOpen={setIsModalOpen}
            onConfirm={handleConfirm}
          />
        ) : null}
      </PageLayOut.BodySection>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default EnrollAddress
