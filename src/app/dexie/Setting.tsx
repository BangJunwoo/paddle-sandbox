'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { db } from '@/model/dexie/dexie'

const dexieDelete = () => {
  const a = db.user.clear()
  const b = db.round.clear()
  const c = db.matchUp.clear()
  return Promise.allSettled([a, b, c])
  // const is = a.every((v) => v.status === 'fulfilled')
}

const Setting = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    const a = await dexieDelete()
    console.log('dexie', a)
    const is = a.every((v) => v.status === 'fulfilled')
    console.log('전부 삭제됨', is)
    // const e = isDexieError(a)
    // console.log(e)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" disabled={isSubmitting ? true : false}>
          reset
        </button>
      </form>
    </div>
  )
}

export default Setting
