import FilterButton from '@/components/common/button/filter-button'
import PointsHistoryFilter from '@/components/my-page-screen/points-history-filter'
import { Fragment, useState } from 'react'

function PointsFilterButton() {
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
      />
    </Fragment>
  )
}

export default PointsFilterButton
