// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { productHandlers } from './productHandlers'
import { InformationHandlers } from './informationHandlers'
import { addressHandlers } from './addressHandlers'

export const worker = setupWorker(
  ...handlers,
  ...productHandlers,
  ...InformationHandlers,
  ...addressHandlers,
)
