import _dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

_dayjs.extend(customParseFormat)
_dayjs.extend(isSameOrBefore)
_dayjs.extend(isSameOrAfter)

export const dayjs = _dayjs
export default dayjs
