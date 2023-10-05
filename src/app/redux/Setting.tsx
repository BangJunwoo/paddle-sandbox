'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, Schema } from '@/model/zod/tournamentZod'

import { useAppDispatch } from '@/model/store/hooks'
import { init } from '@/model/features/tournamentSlice'

import { redirect, useRouter } from 'next/navigation'

type Props = {}

const Setting = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const dispatch = useAppDispatch()

  const onSubmit = async (data: Schema) => {
    // const body = { ...data, type: 'EMAIL' }
    const req = {
      playerEntrySize: data.playerEntrySize,
      totalRound: data.round,
    }
    dispatch(init(req))
    console.log('저장 됨', req)
    router.push('/redux/result')
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('round', {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            placeholder="라운드 수"
          />
          {errors.round ? (
            <span>
              {errors.round?.type} : {errors.round?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input
            {...register('playerEntrySize', {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            placeholder="참여자 수"
          />
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
