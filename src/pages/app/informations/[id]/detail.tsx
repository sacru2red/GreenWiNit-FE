import { useLocation } from 'react-router-dom'

const InformationDetail = () => {
  const location = useLocation()
  const { cardData } = location.state || {}

  if (!cardData) {
    return <div>데이터를 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <h1>{cardData.title}</h1>
      <p>{cardData.content}</p>
      {/* 상세 내용 */}
    </div>
  )
}

export default InformationDetail
