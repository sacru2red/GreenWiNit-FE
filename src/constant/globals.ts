import _dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import ko from 'dayjs/locale/ko'
import { QueryClient } from '@tanstack/react-query'

_dayjs.extend(customParseFormat)
_dayjs.extend(isSameOrBefore)
_dayjs.extend(isSameOrAfter)
_dayjs.locale(ko)

export const queryClient = new QueryClient()

export const dayjs = _dayjs
export default dayjs
