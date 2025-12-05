import { z } from 'zod'

export const insightsSchema = z.object({
  total_phones: z.number(),
  total_fyi1_sent: z.number(),
  total_interacted: z.number(),
  schedule_leads: z.number(),
  total_messages_sent: z.number().optional()
})

export type Insights = z.infer<typeof insightsSchema>
