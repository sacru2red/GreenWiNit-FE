import _dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

_dayjs.extend(customParseFormat)
_dayjs.extend(isSameOrBefore)

export const dayjs = _dayjs
export default dayjs
