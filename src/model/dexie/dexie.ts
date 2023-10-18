import Dexie, { Table } from 'dexie'
import { dexieStore, Round, User, MatchUp } from '@/model/zod/dexieZod'
import { paths } from '@/repository/@types/xsollaStore'

type Cart = NonNullable<
  paths['/v2/project/{project_id}/cart']['get']['responses']['200']['content']['application/json']
>

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  round!: Table<Round>
  user!: Table<User>
  matchUp!: Table<MatchUp>
  cart!: Table<Cart>

  constructor() {
    super('tournamant')
    this.version(2).stores(dexieStore)
  }
}

export const db = new MySubClassedDexie()

export const isDexieError = (res: any) => {
  if (typeof res !== 'object') return false
  console.error(res.toString())
  return 'name' in res && 'message' in res && 'stack' in res
}
