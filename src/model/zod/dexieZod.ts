import * as z from 'zod'
import { ZodObject } from 'zod'

export const roundSchema = z.object({
  id: z.number().nonnegative().optional(),
  progress: z.number().max(2).nonnegative(),
  size: z.number().nonnegative(),
  isLoserMatch: z.boolean(),
})

export type Round = z.infer<typeof roundSchema>

//--------------------------------------------------//

export const userSchema = z.object({
  id: z.number().nonnegative().optional(),
  minRank: z.number().positive(),
})

export type User = z.infer<typeof userSchema>

//--------------------------------------------------//

export const matchUpSchema = z.object({
  id: z.number().nonnegative().optional(),
  round: z.number().positive(),
  roundNumber: z.number().positive(),
  A: z.number().positive(),
  B: z.number().positive(),
})

// round: Round['id']
// roundNumber: number
// A: User['id']
// B: User['id']

export type MatchUp = z.infer<typeof matchUpSchema>

//--------------------------------------------------//

const primaryIsId = (data: ZodObject<any>) => {
  const options = data.keyof().options as string[]

  return options
    .map((item: string) => {
      if (item === 'id') return '++id'
      return item
    })
    .join(',')
}

//-------//

const cart = '++cart_id,is_free,price,items,promotions'

export const dexieStore = {
  round: primaryIsId(roundSchema),
  user: primaryIsId(userSchema),
  matchUp: primaryIsId(matchUpSchema),
  cart,
}
