// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { InformationHandlers } from './informationHandlers'

export const worker = setupWorker(...handlers, ...InformationHandlers)
