export interface FormState {
  id: number | null
  name: string
  date: Date | null
  startTime: Date | null
  endTime: Date | null
  address: {
    roadAddress: string
    roadnameCode: string
    zonecode: string
    detailAddress: string
    sigungu: string
  }
  description: string
  maxMemberCount: number
  openChatUrl: string
}

export interface UpsertPageBodyProps {
  initialData?: FormState | null
  onSubmit: (data: FormState) => void
  mode: 'enroll' | 'modify'
}
