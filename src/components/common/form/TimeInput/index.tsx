import { Button } from '@/components/ui/button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { ComponentProps, Fragment, useState } from 'react'
import Input from '../Input'
import dayjs from 'dayjs'
import TimePicker from './TimePicker'

type TimeInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (value: Date | null) => void
}
const TimeInput = ({ value, onChange, ...restProps }: TimeInputProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [innerValue, setInnerValue] = useState(value == null ? null : value)

  return (
    <Fragment>
      <Input
        {...restProps}
        onClick={() => {
          setOpenDialog(true)
          setInnerValue(value)
        }}
        value={value == null ? '' : dayjs(value).format('HH:mm')}
        contentEditable={false}
        readOnly
      />
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false)
          setInnerValue(null)
        }}
      >
        <DialogContent className="min-w-[300px]">
          <TimePicker value={innerValue} onChange={setInnerValue} />
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
                onChange(innerValue)
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
