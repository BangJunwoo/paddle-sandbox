import * as z from 'zod'

export const schema = z.object({
  round: z.number(),
  playerEntrySize: z.number(),
})

export type Schema = z.infer<typeof schema>

// export const subject = z.string().optional()
