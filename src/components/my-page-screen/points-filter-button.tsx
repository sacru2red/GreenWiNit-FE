import FilterButton from '@/components/common/button/filter-button'
import PointsHistoryFilter from '@/components/my-page-screen/points-history-filter'
import { PointFilterType } from '@/types/points'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

function PointsFilterButton({
  setFilterType,
}: {
  setFilterType: Dispatch<SetStateAction<PointFilterType | null>>
}) {
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
        setFilterType={setFilterType}
      />
    </Fragment>
  )
}

export default PointsFilterButton
