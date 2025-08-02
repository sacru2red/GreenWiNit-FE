// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { productHandlers } from './product-handlers'
import { postHandlers } from './post-handlers'
import { addressHandlers } from './address-handlers'

export const worker = setupWorker(
  ...handlers,
  ...productHandlers,
  ...postHandlers,
  ...addressHandlers,
)
