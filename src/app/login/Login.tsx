'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
import { Schema, schema } from '@/model/zod/emailLogin'
import { StepinCall } from '@/repository/api/StepinApi'
import Link from 'next/link'

// import { joinWithSlash, objectToQueryString } from '@/model/apis/urlUtils'
const server = {
  auth: false,
  url: 'auth/signin',
  queryString: '',
  method: 'POST',
}

type Props = {}

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: Schema) => {
    const body = { ...data, type: 'EMAIL' }

    const response = await StepinCall(server, body)
    console.log('브라우저 response', response)
  }

  return (
    <div>
      <span>isSubmitting: {String(isSubmitting)}</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('email')} placeholder="example@example.com" autoComplete="test-email" />
          {errors.email ? (
            <span>
              {errors.email?.type} : {errors.email?.message}
            </span>
          ) : null}
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="password" autoComplete="current-password" />
          {errors.password ? (
            <span>
              {errors.password?.type} : {errors.password?.message}
            </span>
          ) : null}
        </div>
        <button type="submit" disabled={isSubmitting ? true : false}>
          submit
        </button>
      </form>
      <Link href="/products">go to user info</Link>
    </div>
  )
}

export default Login
