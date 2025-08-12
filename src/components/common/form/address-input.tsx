import { ComponentProps, Fragment, useRef, useState } from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'
import Input from './input'
import { Dialog, DialogContent } from '../../ui/dialog'

export type AddressState = null | {
  roadAddress: string
  roadnameCode: string
  zonecode: string
  detailAddress: string
  sigungu: string
}

type AddressInputProps = ComponentProps<typeof DaumPostcodeEmbed> & {
  autoClose?: never
  onComplete?: never
  value: null | AddressState
  onChange: (value: AddressState) => void
}
const AddressInput = ({ value, onChange, ...restProps }: AddressInputProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [innerValue, setInnerValue] = useState<AddressState>({
    roadAddress: value?.roadAddress ?? '',
    roadnameCode: value?.roadnameCode ?? '',
    zonecode: value?.zonecode ?? '',
    detailAddress: value?.detailAddress ?? '',
    sigungu: value?.sigungu ?? '',
  })
  const detailAddressRef = useRef<HTMLInputElement>(null)

  const onComplete: ComponentProps<typeof DaumPostcodeEmbed>['onComplete'] = (data) => {
    setOpenDialog(false)
    const nextAddressState: AddressState = {
      roadAddress: data.roadAddress,
      roadnameCode: data.roadnameCode,
      zonecode: data.zonecode,
      detailAddress: '',
      sigungu: data.sigungu,
    }
    setInnerValue(nextAddressState)
    onChange(nextAddressState)
    detailAddressRef.current?.focus()
  }

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-4">
        <Input
          placeholder="도로명 주소"
          onClick={() => {
            setOpenDialog(true)
            detailAddressRef.current?.focus()
          }}
          value={innerValue?.roadAddress}
          contentEditable={false}
          readOnly
        />
        <Input
          placeholder="상세 위치 정보를 입력해주세요."
          value={innerValue?.detailAddress}
          onChange={(e) => {
            const newDetailAddress = e.target.value
            // 도로명 주소를 선택해야 상세 정보 입력가능
            if (innerValue == null) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            /*
            setInnerValue((prev) => {
              if (prev == null) {
                return null
              }
              const nextAddressState: AddressState = {
                ...prev,
                detailAddress: e.target.value,
              }
              onChange(nextAddressState)
              return nextAddressState
            })
            */
            setInnerValue((prev) => {
              if (prev === null) return null
              return {
                ...prev,
                detailAddress: e.target.value,
              }
            })

            setTimeout(() => {
              if (innerValue) {
                const nextAddressState: AddressState = {
                  ...innerValue,
                  detailAddress: newDetailAddress,
                }
                onChange(nextAddressState)
              }
            }, 0)
          }}
          ref={detailAddressRef}
        />
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="min-w-[400px]">
          <DaumPostcodeEmbed {...restProps} onComplete={onComplete} autoClose={false} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddressInput
