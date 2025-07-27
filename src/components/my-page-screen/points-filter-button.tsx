import FilterButton from '@/components/common/button/filter-button'
import { FilterType } from '@/components/my-page-screen/point-history-container'
import PointsHistoryFilter from '@/components/my-page-screen/points-history-filter'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

function PointsFilterButton({ setType }: { setType: Dispatch<SetStateAction<FilterType>> }) {
  const [isPointsHistoryFilterOpen, setIsPointsHistoryFilterOpen] = useState(false)

  const openDialog = () => {
    setIsPointsHistoryFilterOpen(true)
  }

  return (
    <Fragment>
      <FilterButton openDialog={openDialog} />
      <PointsHistoryFilter
        isOpen={isPointsHistoryFilterOpen}
        setIsOpen={setIsPointsHistoryFilterOpen}
        setType={setType}
      />
    </Fragment>
  )
}

export default PointsFilterButton
