'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roundSchema, Round } from '@/model/zod/dexieZod'
import { db, isDexieError } from '@/model/dexie/dexie'
import { DexieError } from 'dexie'
import InputRemover from '@/view/viewController/InputRemover'

const schema = roundSchema.keyof().options

const addUser = ({ id, progress, size, isLoserMatch }: Round) => {
  return db.round.add({
    id,
    progress,
    size,
    isLoserMatch,
  })
}

const RoundNav = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Round>({
    resolver: zodResolver(roundSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: Round) => {
    // const body = { ...data, type: 'EMAIL' }
    const req = {
      id: data[schema[0]],
      progress: data[schema[1]],
      size: data[schema[2]],
      isLoserMatch: data[schema[3]],
    }
    console.log(req)
    const a = await addUser(req).catch((e: DexieError) => e)
    isDexieError(a)
  }
  return (
    <div>
      <h2>Round</h2>
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
            min={0}
            max={2}
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
            min={0}
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
          <label>
            {schema[3]}
            <input {...register(schema[3])} type="checkbox" />
          </label>
          {errors[schema[3]] ? (
            <span>
              {errors[schema[3]]?.type} : {errors[schema[3]]?.message}
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

export default RoundNav
