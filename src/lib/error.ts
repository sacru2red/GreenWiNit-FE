import { toast } from 'sonner'

export function showMessageIfExists(error: Error) {
  toast.error(error.message)
}
