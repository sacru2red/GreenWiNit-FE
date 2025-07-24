export type PointTransaction = {
  pointTransactionId: string
  description: string
  amount: number
  status: string // "Earn" | "SPEND"
  transactionAt: string // ISO 날짜 문자열
}
