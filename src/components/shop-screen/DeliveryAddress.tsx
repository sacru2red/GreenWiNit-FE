// DeliveryAddress.tsx
import useAddress from '@/hooks/useAdress'
import { Plus } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AddressState } from '../common/form/AddressInput'
import { ClientAddressInfo } from '@/types/addresses'

interface DeliveryAddressProps {
  pointProductId?: string | undefined
}

const DeliveryAddress = ({ pointProductId: propPointProductId }: DeliveryAddressProps = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ pointProductId: string }>()

  const pointProductId = propPointProductId || params.pointProductId

  const { data: userAddressData, isLoading } = useAddress()
  const defaultUserInfo: ClientAddressInfo = {
    id: 0,
    name: '',
    phone: '',
    address: {
      roadAddress: '',
      roadnameCode: '',
      zonecode: '',
      detailAddress: '',
      sigungu: '',
    },
  }

  const userInfo = userAddressData || defaultUserInfo

  const totalAddress = (address: AddressState) => {
    if (address === undefined || address === null) {
      return
    }
    return address.roadAddress + address.detailAddress
  }

  console.log(userInfo)

  const hasAddressInfo = () => {
    return userInfo.name && userInfo.phone && userInfo.address
  }

  const handleAddressClick = () => {
    if (!pointProductId) {
      console.error('pointProductId가 없습니다.')
      return
    }

    const state = { from: location.pathname + location.search }

    if (hasAddressInfo()) {
      navigate(`/point-shop/product/${pointProductId}/enrollAddress?mode=edit`, { state })
    } else {
      navigate(`/point-shop/product/${pointProductId}/enrollAddress?mode=add`, { state })
    }
  }

  if (isLoading) {
    return <div>주소 정보를 불러오는 중...</div>
  }

  return (
    <div>
      <div className="text-xl font-bold">배송지 정보</div>
      {hasAddressInfo() ? (
        <div className="m-[20px] flex flex-col border p-[20px] text-start">
          <div className="flex flex-row justify-between">
            <div>
              <span className="font-bold">이름: </span>
              <span>{userInfo.name}</span>
            </div>
            <button
              className="max-h-[40px] rounded-[8px] bg-green-600 px-[30px] py-[10px] text-white"
              onClick={handleAddressClick}
            >
              수정
            </button>
          </div>
          <div>
            <span className="font-bold">전화번호: </span>
            <span>{userInfo.phone}</span>
          </div>
          <div>
            <span className="font-bold">주소: </span>
            <span>{totalAddress(userInfo.address)}</span>
          </div>
        </div>
      ) : (
        <div className="m-2 flex flex-col border p-4">
          <div className="pb-2">배송지를 먼저 등록해주세요</div>
          <button
            onClick={handleAddressClick}
            className="mx-[120px] flex flex-row items-center justify-center rounded-[10px] bg-green-500 py-2 text-white transition hover:bg-green-600"
          >
            <Plus size={20} />
            <span>등록하기</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default DeliveryAddress
