import WheelItem from './wheel-item'

interface TimeWheelProps<T extends string | number> {
  items: readonly T[]
  selectedValue: T
  onWheel: (e: React.WheelEvent) => void
  padLeft?: boolean
  onClickWheelItem: (item: T) => void
  isHour?: boolean
}

const TimeWheel = <T extends string | number>({
  items,
  selectedValue,
  onWheel,
  padLeft = false,
  onClickWheelItem,
  isHour,
}: TimeWheelProps<T>) => {
  return (
    <div
      className="relative h-24 w-12 overflow-hidden rounded-lg sm:h-32 md:h-36 md:w-16"
      onWheel={onWheel}
    >
      <div className="flex h-full transform flex-col items-center justify-center transition-transform duration-300 ease-out">
        {items.map((item, index) => {
          const isSelected = isHour
            ? Number(item) % 12 === Number(selectedValue) % 12
            : item === selectedValue
          const distance = index - items.indexOf(selectedValue)
          const maxDistance = Math.floor(items.length / 2)

          return (
            <WheelItem
              key={item}
              value={padLeft ? item.toString().padStart(2, '0') : item}
              isSelected={isSelected}
              distance={distance}
              maxDistance={maxDistance}
              onClick={() => onClickWheelItem(item)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimeWheel
