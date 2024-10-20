// schemas/alertSchema.ts
import { z } from 'zod'

export const alertSchema = z.object({
  user_id: z.string().uuid(),
  symbol_id: z.string(),
  indicator_id: z.string(),
  logic_id: z.string(),
  value: z.string().min(0),
  action_id: z.string(),
  alert_type: z.string(),
})

export type AlertFormData = z.infer<typeof alertSchema>
