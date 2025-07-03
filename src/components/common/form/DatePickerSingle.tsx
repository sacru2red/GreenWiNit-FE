import ReactDatePickerLib, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale/ko'
import Input from './Input'
import { ComponentProps } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { cn } from '@/lib/utils'

registerLocale('ko', ko)
setDefaultLocale('ko')

type DatePickerSingleProps = ComponentProps<typeof ReactDatePickerLib> & {
  customInput?: never
  icon?: never
  showIcon?: never
  toggleCalendarOnIconClick?: never
  dateFormat?: never
  dateFormatCalendar?: never
}
const DatePickerSingle = (props: DatePickerSingleProps) => {
  return (
    <ReactDatePickerLib
      {...props}
      customInput={<Input className="!px-4 !py-3 !pl-[40px]" />}
      icon={<CalendarMonthOutlinedIcon className="top-[12px] left-[8px] cursor-pointer !p-0" />}
      showIcon
      toggleCalendarOnIconClick
      wrapperClassName={cn('w-full', props.wrapperClassName)}
      dateFormat="yyyy.MM.dd"
      dateFormatCalendar="yyyy년 M월"
    />
  )
}

export default DatePickerSingle
