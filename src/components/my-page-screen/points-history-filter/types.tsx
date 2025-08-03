import { PointFilterType } from '@/types/points'
import { Dispatch, SetStateAction } from 'react'

export interface PointsHistoryFilterProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setFilterType: Dispatch<SetStateAction<PointFilterType | null>>
}
