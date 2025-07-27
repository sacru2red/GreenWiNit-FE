import FilterButton from '@/components/common/button/filter-button'
import PointsHistoryFilter from '@/components/my-page-screen/points-history-filter'
import { FilterType } from '@/pages/my-page/my-points'
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
