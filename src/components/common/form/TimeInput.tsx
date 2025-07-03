import { Button } from '@/components/ui/button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers'
import { ComponentProps, Fragment, useState } from 'react'
import Input from './Input'
import dayjs from 'dayjs'

type TimeInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (value: Date | null) => void
}
const TimeInput = ({ value, onChange, ...restProps }: TimeInputProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [innerValue, setInnerValue] = useState(value == null ? null : dayjs(value))

  return (
    <Fragment>
      <Input
        {...restProps}
        onClick={() => setOpenDialog(true)}
        value={value == null ? '' : dayjs(value).format('HH:mm')}
        contentEditable={false}
        readOnly
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="min-w-[300px]">
          <MultiSectionDigitalClock
            timeSteps={{ hours: 1, minutes: 1 }}
            views={['hours', 'minutes']}
            className="[&_ul]:scrollbar-stable [&_ul]:inline-flex [&_ul]:flex-1 [&_ul]:flex-col [&_ul]:items-center"
            value={innerValue}
            onChange={(newValue) => {
              if (newValue == null) {
                setInnerValue(dayjs())
              } else {
                setInnerValue(dayjs(newValue))
              }
            }}
          />
          <div className="mt-6 flex flex-row gap-6">
            <Button variant="cancel" size="flex" onClick={() => setOpenDialog(false)}>
              취소
            </Button>
            <Button
              size="flex"
              onClick={() => {
                if (innerValue == null) {
                  return
                }
                onChange(innerValue.toDate())
                setOpenDialog(false)
              }}
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default TimeInput
