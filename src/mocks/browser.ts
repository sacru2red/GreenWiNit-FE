// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { productHandlers } from './productHandlers'
import { InformationHandlers } from './informationHandlers'

export const worker = setupWorker(...handlers, ...productHandlers, ...InformationHandlers)
