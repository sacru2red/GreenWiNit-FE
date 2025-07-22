import { Plus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const DeliveryAddress = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const addAddressClick = () => {
    navigate(`${location.pathname}/enrollAddress`)
  }

  return (
    <div>
      <div className="text-xl font-bold">배송지 정보</div>
      <div className="m-[20px] flex flex-col border p-[20px]">
        <div className="pb-[20px]">배송지를 먼저 등록해주세요</div>
        <button
          onClick={addAddressClick}
          className={
            'mx-[120px] flex flex-row items-center justify-center rounded-[10px] bg-green-500 py-[8px] text-white transition hover:bg-green-600'
          }
        >
          <Plus size={20} />
          <span>등록하기</span>
        </button>
      </div>
    </div>
  )
}

export default DeliveryAddress
