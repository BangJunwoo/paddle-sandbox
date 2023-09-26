import 'server-only'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const getCookies = () => {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accesstoken')
  const refreshtoken = cookieStore.get('refreshtoken')

  return {
    accesstoken: accesstoken?.value,
    refreshtoken: refreshtoken?.value,
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log(request)

  // auth 에서 request 에서 cookies 정보 얻어야댐
  const data = { ...body, ...getCookies() }
  console.log(data)

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
