import PointsFilterButton from '@/components/my-page-screen/points-filter-button'
import PointsHistoryList from '@/components/my-page-screen/points-history-list'

function PointHistoryContainer() {
  type PointHistoryItem = {
    pointTransactionId: string
    description: string
    amount: number
    status: 'EARN' | 'SPEND'
    transactionAt: string // ISO 문자열
  }

  const list = [
    {
      pointTransactionId: '1L',
      description: '텀블러 사용 챌린지 완료',
      amount: 700,
      status: 'EARN',
      transactionAt: '2025-07-12T08:43:38.908Z',
    },
    {
      pointTransactionId: '2l',
      description: '대중교통 이용 챌린지 완료',
      amount: 500,
      status: 'EARN',
      transactionAt: '2025-06-10T08:43:38.908Z',
    },
    {
      pointTransactionId: '1L',
      description: '친환경 텀블러 교환',
      amount: 700,
      status: 'SPEND',
      transactionAt: '2025-06-05T08:43:38.908Z',
    },
    {
      pointTransactionId: '1L',
      description: '플라스틱 줄이기 챌린지 완료',
      amount: 800,
      status: 'EARN',
      transactionAt: '2025-06-01T08:43:38.908Z',
    },
  ] satisfies PointHistoryItem[]

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">포인트 내역</h2>
        <PointsFilterButton />
      </div>
      <PointsHistoryList list={list} />
    </section>
  )
}

export default PointHistoryContainer
