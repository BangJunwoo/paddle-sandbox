import * as z from 'zod'

export const schema = z.object({
  round: z.number().default(1),
  playerEntrySize: z.number().min(1, { message: '필수 항목 입니다' }),
})

export type Schema = z.infer<typeof schema>

// export const subject = z.string().optional()
