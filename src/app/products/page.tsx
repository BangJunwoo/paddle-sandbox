'use client'
import React from 'react'
import Link from 'next/link'
import { StepinCall, ServerFetchOption } from '@/repository/api/StepinApi'
import { objectToQueryString } from '@/model/apis/urlUtils'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <button
        onClick={async () => {
          const server = {
            auth: true,
            url: 'video/search',
            queryString: objectToQueryString({ keyword: 'blackpink', page: 1, limit: 9 }),
            method: 'GET',
          } as ServerFetchOption
          const body = {}
          const res = await StepinCall(server, body)
          console.log(res)
        }}
      >
        유저 정보 흭득
      </button>
      <button
        onClick={async () => {
          const res = await fetch('/apis', { method: 'POST', body: '{}' })
          const data = await res.json()
          console.log(res, data)
        }}
      >
        테스트
      </button>
      <Link href="/login">login</Link>
    </div>
  )
}

export default page
