import AddressInput from '../../../../components/common/form/address-input'
import { useState, useEffect } from 'react'
import Input from '@/components/common/form/input'
import InputLabel from '../../../../components/common/form/input-label'
import BottomNavigation from '../../../../components/common/bottom-navigation'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { addressApi } from '@/api/addresses'
import { ClientAddress } from '@/types/addresses'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { toast } from 'sonner'
import { Button } from '@/components/common/button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '@/components/common/form/error-message'
import useAddress from '@/hooks/use-adress'
import NoticeDialog from '@/components/common/modal/notice-dialog'

export const Route = createFileRoute('/point-shop/products/$point-product-id/enroll-address')({
  component: EnrollAddress,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: search['mode'],
    }
  },
})

function EnrollAddress() {
  const { mode } = Route.useSearch()
  const isEditMode = mode === 'edit'
  const router = useRouter()
  const { register, handleSubmit, control, formState, setValue } = useForm<ClientAddressForm>({
    defaultValues: {
      name: '',
      phone: '',
      address: null,
    },
  })
  const errors = formState.errors
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEditsuccess, setShowEditSuccess] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isEditSubmitted, setIsEditSubmitted] = useState(false)

  const { data: deliveryAddress } = useAddress()
  const [originalClientData, setOriginalClientData] = useState<ClientAddressForm | null>(null)

  useEffect(() => {
    if (isEditMode && deliveryAddress) {
      setValue('name', deliveryAddress.name)
      setValue('phone', deliveryAddress.phone)

      /*
        build error -> 우편번호 api에서는 zonecode,
        백엔드 api에서는 zipCode를 요구함
      */
      if (deliveryAddress.address) {
        const transformedAddress = {
          ...deliveryAddress.address,
          zipCode: deliveryAddress.address.zonecode,
        }
        setValue('address', transformedAddress)
      }

      setOriginalClientData({
        name: deliveryAddress.name,
        phone: deliveryAddress.phone,
        address: deliveryAddress.address,
      })
    }
  }, [deliveryAddress, setValue, isEditMode])

  /* 배송지 수정 성공 시 안내 문구 띄우는 로직*/
  useEffect(() => {
    if (isEditSubmitted && isEditMode) {
      setIsVisible(true)
      setShowEditSuccess(true)

      const fadeTimer = setTimeout(() => {
        setIsVisible(false)
      }, 2000)

      const timer = setTimeout(() => {
        setShowEditSuccess(false)
        setIsEditSubmitted((prev) => !prev)
      }, 3000)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(timer)
      }
    }
    return () => {}
  }, [isEditSubmitted, isEditMode])

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/(\D)/g, '').replace(/^(\d)+$/, (match) => {
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
  }

  const submitHandler: SubmitHandler<ClientAddressForm> = async (submittedFormData) => {
    const address = submittedFormData.address
    if (address === null) {
      toast.error('배송지 정보를 입력해주세요.')
      return
    }

    if (isEditMode) {
      if (!originalClientData) {
        toast.error('기존 주소 정보가 없습니다')
        return
      }

      if (originalClientData.address == null) {
        toast.error('주소 정보를 확인해주세요.')
        return
      }
    }
    try {
      const serverData = {
        recipientName: submittedFormData.name,
        phoneNumber: formatPhoneNumber(submittedFormData.phone),
        roadAddress: address.roadAddress,
        detailAddress: address.detailAddress,
        zipCode: address.zonecode,
      }
      if (isEditMode) {
        await addressApi.updateAddress(serverData)
        setIsEditSubmitted((prev) => !prev)
      } else {
        await addressApi.saveAddress(serverData)
        setIsModalOpen(true)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다')
    }
  }

  const handleConfirm = () => {
    router.history.back()
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
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
                  pattern: {
                    value: /^(0\d{1,2}-\d{3,4}-\d{4}|0\d{8,10})$/,
                    message: '전화번호 형식에 맞지 않습니다.',
                  },
                })}
              />
              <ErrorMessage name="phone" errors={errors} />

              <InputLabel required={true}>주소</InputLabel>
              <Controller
                control={control}
                name="address"
                rules={{ required: '주소를 입력해주세요.' }}
                render={({ field }) => {
                  return <AddressInput {...field} />
                }}
              />
              <ErrorMessage name="address" errors={errors} />
            </div>
            <div className="relative mt-auto">
              {showEditsuccess && (
                <div
                  className={`absolute -top-14 w-full transition-opacity duration-500 ${isVisible ? `opacity-100` : `opacity-0`} bg-ring flex justify-center rounded-md p-2 text-center text-white`}
                >
                  수정이 완료되었습니다.
                </div>
              )}
              <Button type="submit" className="w-full">
                저장하기
              </Button>
            </div>
          </form>
          {isModalOpen && (
            <NoticeDialog
              isOpen={isModalOpen}
              description="배송지 저장이 완료되었습니다.\n이제 상품을 교환할 수 있습니다!"
              setIsOpen={setIsModalOpen}
              onConfirm={handleConfirm}
            />
          )}
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

type ClientAddressForm = Omit<ClientAddress, 'id'>

export default EnrollAddress
