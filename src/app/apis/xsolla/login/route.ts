import 'server-only'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { xsollaLoginInstance } from '@/repository/api/xsolla-interceptor'

import type { ServerFetchOption } from '@/repository/api/XStoreFetchClient'
const getCookies = () => {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('xsollaToken')
  return accesstoken?.value
}

export async function POST(request: Request) {
  // const { searchParams } = new URL(request.url)

  const body = await request.json()
  console.log(body)

  if (typeof body.server === 'undefined') {
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: 'apis/xsolla/v2 server props is null',
      }
    )
  }

  const currentToken = getCookies()
  // body 안에 openapi-fetch body가 있는 구조
  const { GET, POST, PUT, DELETE } = xsollaLoginInstance
  const { url, method } = body.server as ServerFetchOption
  delete body.server
  let res
  if (method === 'GET') {
    const data = { ...body, headers: { Authorization: `Bearer ${currentToken}` } }
    //@ts-ignore
    res = await GET(url, data)
  }
  if (method === 'POST') {
    const data = { ...body, headers: { Authorization: `Bearer ${currentToken}` } }
    //@ts-ignore
    res = await POST(url, data)
  }
  if (method === 'PUT') {
    const data = { ...body, headers: { Authorization: `Bearer ${currentToken}` } }
    console.log('PUT', data)
    //@ts-ignore
    res = await PUT(url, data)
  }
  if (method === 'DELETE') {
    const data = { ...body, headers: { Authorization: `Bearer ${currentToken}` } }
    //@ts-ignore
    res = await DELETE(url, data)
  }
  //@ts-ignore
  const { data, error } = res
  if (error) return NextResponse.json(error)

  return NextResponse.json(data)
}
