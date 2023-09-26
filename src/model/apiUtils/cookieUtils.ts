'use server'

import { cookies } from 'next/headers'

type Second = number

type Cookies = {
  name: string
  value: any
  httpOnly: boolean
  maxAge: Second
  secure: boolean
}

// 60 * 60 * 24 = 1Day

export async function create({ name, value, httpOnly, maxAge, secure }: Cookies) {
  cookies().set({
    name,
    value,
    httpOnly,
    path: '/',
    maxAge,
    secure,
    sameSite: 'strict',
  })
}

export async function cookieDelete(name: string) {
  cookies().set(name, '', { maxAge: 0 })
}
