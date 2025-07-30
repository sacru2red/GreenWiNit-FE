export type PointFilterType = 'all' | 'earn' | 'spend'

export type PointHistory = {
  pointTransactionId: string
  description: string
  amount: number
  status: 'EARN' | 'SPEND'
  transactionAt: string // ISO 문자열
}
