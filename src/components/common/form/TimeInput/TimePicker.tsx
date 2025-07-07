import dayjs from 'dayjs'
import { useState, useRef, useEffect } from 'react'

interface TimePickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
}
/**
 * It's from https://preline.co/docs/time-picker.html#custom-design and modified
 */
const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const propHours = value?.getHours()
  const [selectedHour, setSelectedHour] = useState(propHours ?? 0)
  const [selectedMinute, setSelectedMinute] = useState(value?.getMinutes() ?? 0)
  const [selectedAMPM, setSelectedAMPM] = useState<'PM' | 'AM'>(
    propHours && propHours >= 12 ? 'PM' : 'AM',
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onChange(
      dayjs(0)
        .hour(selectedAMPM === 'PM' ? selectedHour + 12 : selectedHour)
        .minute(selectedMinute)
        .toDate(),
    )
    // ignore onChange
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHour, selectedMinute, selectedAMPM])

  return (
    <div className="" ref={ref}>
      <div
        className="mt-2 min-w-30 rounded-lg border border-gray-200 bg-white shadow-xl"
        role="menu"
        aria-orientation="vertical"
      >
        <div className="flex flex-row divide-x divide-gray-200">
          {/* Hours */}
          <div className="scrollbar-stable max-h-56 flex-1 overflow-y-auto p-4">
            {hours.map((hh) => (
              <label
                key={hh}
                className={`group flex cursor-pointer items-center justify-center rounded-md px-2 py-1 text-center text-sm hover:bg-gray-100 ${selectedHour === Number(hh) ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="hour"
                  checked={selectedHour === Number(hh)}
                  onChange={() => setSelectedHour(Number(hh))}
                />
                <span>{hh}</span>
              </label>
            ))}
          </div>
          {/* Minutes */}
          <div className="scrollbar-stable max-h-56 flex-1 overflow-y-auto p-4">
            {minutes.map((m) => {
              const isSelected = selectedMinute === Number(m)

              return (
                <label
                  key={m}
                  className={`group flex cursor-pointer items-center justify-center rounded-md px-2 py-1 text-center text-sm hover:bg-gray-100 ${isSelected ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="minute"
                    checked={isSelected}
                    onChange={() => setSelectedMinute(Number(m))}
                  />
                  <span>{m}</span>
                </label>
              )
            })}
          </div>
          {/* AM/PM */}
          <div className="scrollbar-stable max-h-56 flex-1 overflow-y-auto p-4">
            {ampm.map((ap) => (
              <label
                key={ap}
                className={`group flex cursor-pointer items-center justify-center rounded-md px-2 py-1 text-center text-sm hover:bg-gray-100 ${selectedAMPM === ap ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="ampm"
                  checked={selectedAMPM === ap}
                  onChange={() => setSelectedAMPM(ap)}
                />
                <span>{ap}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const hours = Array.from({ length: 12 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
const ampm = ['AM', 'PM'] as const

export default TimePicker
