import useAddress from '@/hooks/use-adress'
import { Plus } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Fragment } from 'react'
import { Button } from '../ui/button'

interface DeliveryAddressProps {
  pointProductId?: string | undefined
}

const DeliveryAddress = ({ pointProductId: propPointProductId }: DeliveryAddressProps = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ pointProductId: string }>()

  const pointProductId = propPointProductId || params.pointProductId

  const { data: userAddressData, isLoading } = useAddress()

  const hasAddress = Boolean(
    userAddressData && userAddressData !== null && userAddressData !== undefined,
  )

  const handleAddressClick = () => {
    if (!pointProductId) {
      console.error('pointProductId가 없습니다.')
      return
    }

    const state = { from: location.pathname + location.search }

    if (hasAddress) {
      navigate(`/point-shop/product/${pointProductId}/enroll-address?mode=edit`, { state })
    } else {
      navigate(`/point-shop/product/${pointProductId}/enroll-address?mode=add`, { state })
    }
  }

  if (isLoading) {
    return <div>주소 정보를 불러오는 중...</div>
  }

  return (
    <Fragment>
      <div className="text-xl font-bold">배송지 정보</div>
      {hasAddress ? (
        <div className="text-md m-4 flex flex-col rounded-lg border p-4 text-start md:text-base">
          <div className="flex flex-row justify-between">
            <div>
              <span className="font-bold">이름: </span>
              <span>{userAddressData?.name}</span>
            </div>
            <Button
              className="max-h-10 rounded-md px-6 py-2 text-white"
              onClick={handleAddressClick}
            >
              수정
            </Button>
          </div>
          <div>
            <span className="font-bold">전화번호: </span>
            <span>{userAddressData?.phone}</span>
          </div>
          <div>
            <span className="font-bold">주소: </span>
            <span>
              {userAddressData && userAddressData.address
                ? `${userAddressData.address.roadAddress} ${userAddressData.address.detailAddress}`
                : null}
            </span>
          </div>
        </div>
      ) : (
        <div className="m-4 flex flex-col rounded-lg border p-8">
          <div className="pb-4 text-base md:text-lg">배송지를 먼저 등록해주세요</div>
          <Button
            onClick={handleAddressClick}
            className="mx-24 flex flex-row items-center justify-center rounded-md bg-emerald-500 p-2 text-white"
          >
            <Plus size={20} />
            <span>등록하기</span>
          </Button>
        </div>
      )}
    </Fragment>
  )
}

export default DeliveryAddress
