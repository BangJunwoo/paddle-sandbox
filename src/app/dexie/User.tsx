'use client'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, User } from '@/model/zod/dexieZod'
import { db, isDexieError } from '@/model/dexie/dexie'
import { DexieError } from 'dexie'
import InputRemover from '@/view/viewController/InputRemover'

const schema = userSchema.keyof().options

const addUser = ({ id, minRank }: User) => {
  return db.user.add({
    id,
    minRank,
  })
}

const Nav = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: User) => {
    // const body = { ...data, type: 'EMAIL' }
    const req = {
      id: data[schema[0]],
      minRank: data[schema[1]],
    }
    const a = await addUser(req).catch((e: DexieError) => e)
    isDexieError(a)
  }
  return (
    <div>
      <h2>User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register(schema[0], {
              setValueAs: (value?: string) => {
                if (value) return Number(value)
              },
            })}
            min={0}
            type="number"
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
        <button type="submit" disabled={isSubmitting ? true : false}>
          submit
        </button>
      </form>
    </div>
  )
}

export default Nav
