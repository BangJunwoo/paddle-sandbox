'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { db } from '@/model/dexie/dexie'

const dexieDelete = () => {
  return db.user.update(2, { minRank: 5 })
}

const Setting = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    dexieDelete().then(function (updated) {
      if (updated) console.log('Friend number 2 was renamed to Number 2', updated)
      else console.log('Nothing was updated - there were no friend with primary key: 2')
    })
    // const e = isDexieError(a)
    // console.log(e)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" disabled={isSubmitting ? true : false}>
          update
        </button>
      </form>
    </div>
  )
}

export default Setting
