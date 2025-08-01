// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { productHandlers } from './productHandlers'
import { postHandlers } from './postHandlers'
import { addressHandlers } from './addressHandlers'

export const worker = setupWorker(
  ...handlers,
  ...productHandlers,
  ...postHandlers,
  ...addressHandlers,
)
