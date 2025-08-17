import { createFileRoute } from '@tanstack/react-router'
import InternalServerError from '@/components/common/internal-server-error'

export const Route = createFileRoute('/500')({
  component: InternalServerError,
})
