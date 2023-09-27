'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, Schema } from '@/model/zod/tournamentZod'

type Props = {}

const Setting = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: Schema) => {
    // const body = { ...data, type: 'EMAIL' }
    console.log('브라우저 response', data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('round')} placeholder="라운드 수" />
          {errors.round ? (
            <span>
              {errors.round?.type} : {errors.round?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input {...register('playerEntrySize')} type="number" placeholder="참여자 수" />
          {errors.playerEntrySize ? (
            <span>
              {errors.playerEntrySize?.type} : {errors.playerEntrySize?.message}
            </span>
          ) : null}
        </div>
        <button type="submit" disabled={isSubmitting ? true : false}>
          submit
        </button>
      </form>
    </div>
  )
}

export default Setting
