import _dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

_dayjs.extend(customParseFormat)

export const dayjs = _dayjs
