'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { matchUpSchema, MatchUp } from '@/model/zod/dexieZod'
import { db, isDexieError } from '@/model/dexie/dexie'
import { DexieError } from 'dexie'
import InputRemover from '@/view/viewController/InputRemover'

const schema = matchUpSchema.keyof().options

const addUser = ({ id, round, roundNumber, A, B }: MatchUp) => {
  return db.matchUp.add({
    id,
    round,
    roundNumber,
    A,
    B,
  })
}

const MatchUpNav = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MatchUp>({
    resolver: zodResolver(matchUpSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: MatchUp) => {
    // const body = { ...data, type: 'EMAIL' }
    const req = {
      id: data[schema[0]],
      round: data[schema[1]],
      roundNumber: data[schema[2]],
      A: data[schema[3]],
      B: data[schema[4]],
    }
    const a = await addUser(req).catch((e: DexieError) => e)
    isDexieError(a)
  }
  return (
    <div>
      <h2>matchUp</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register(schema[0], {
              setValueAs: (value?: string) => {
                if (value) return Number(value)
              },
            })}
            type="number"
            min={0}
            placeholder={schema[0]}
          />
          <InputRemover />
          {errors[schema[0]] ? (
            <span>
              {errors[schema[0]]?.type} : {errors[schema[0]]?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input
            {...register(schema[1], {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            min={1}
            placeholder={schema[1]}
          />
          <InputRemover />
          {errors[schema[1]] ? (
            <span>
              {errors[schema[1]]?.type} : {errors[schema[1]]?.message}
            </span>
          ) : null}
        </div>

        <div>
          <input
            {...register(schema[2], {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            min={1}
            placeholder={schema[2]}
          />
          <InputRemover />
          {errors[schema[2]] ? (
            <span>
              {errors[schema[2]]?.type} : {errors[schema[2]]?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input
            {...register(schema[3], {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            min={1}
            placeholder={schema[3]}
          />
          <InputRemover />
          {errors[schema[3]] ? (
            <span>
              {errors[schema[3]]?.type} : {errors[schema[3]]?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input
            {...register(schema[4], {
              setValueAs: (value: string) => Number(value),
            })}
            type="number"
            min={1}
            placeholder={schema[4]}
          />
          <InputRemover />
          {errors[schema[4]] ? (
            <span>
              {errors[schema[4]]?.type} : {errors[schema[4]]?.message}
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

export default MatchUpNav
