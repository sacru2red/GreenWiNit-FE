import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const userInfos = {
  name: '김환경',
  phone: '010-1111-1111',
  address: '서울 강동구 아리수로 50길 50래미안힐스테이트 고덕 101동 1004',
}

interface DeliveryAddressProps {
  pointProductId: string | undefined
}

const DeliveryAddress = ({ pointProductId }: DeliveryAddressProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [userInfo, setUserInfo] = useState(userInfos)

  const handleEnrollAddress = () => {
    navigate(`/point-shop/product/${pointProductId}/enrollAddress?mode=add`, {
      state: { from: location.pathname + location.search },
    })
  }

  const handleUpdateAddress = () => {
    navigate(`/point-shop/product/${pointProductId}/enrollAddress?mode=edit`, {
      state: { from: location.pathname + location.search },
    })
  }

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('deliveryUserInfo')
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo))
    }
  }, [])

  return (
    <div>
      <div className="text-xl font-bold">배송지 정보</div>
      {userInfo ? (
        <div className="m-[20px] flex flex-col border p-[20px] text-start">
          <div className="flex flex-row justify-between">
            <div>
              <span className="text-bold">이름: </span>
              <span>{userInfo.name}</span>
            </div>
            <button
              className="max-h-[40px] rounded-[8px] bg-green-600 px-[30px] py-[10px] text-white"
              onClick={handleUpdateAddress}
            >
              수정
            </button>
          </div>
          <div>
            <span className="text-bold">전화번호: </span>
            <span>{userInfo.phone}</span>
          </div>
          <div>
            <span className="text-bold">주소: </span>
            <span>{userInfo.address}</span>
          </div>
        </div>
      ) : (
        <div className="m-[20px] flex flex-col border p-[20px]">
          <div className="pb-[20px]">배송지를 먼저 등록해주세요</div>
          <button
            onClick={handleEnrollAddress}
            className={
              'mx-[120px] flex flex-row items-center justify-center rounded-[10px] bg-green-500 py-[8px] text-white transition hover:bg-green-600'
            }
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
