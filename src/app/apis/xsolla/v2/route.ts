import 'server-only'
import { NextResponse } from 'next/server'
import createClient from 'openapi-fetch'
import { paths } from '@/repository/@types/xsollaStore'
import { cookies } from 'next/headers'

import type { ServerFetchOption } from '@/repository/api/XsollaClient'
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

  const { GET, POST, PUT, DELETE } = createClient<paths>({
    headers: { Authorization: `Bearer ${currentToken}` },
    baseUrl: 'https://store.xsolla.com/api',
  })
  const { url, method } = body.server as ServerFetchOption
  delete body.server
  let res
  if (method === 'GET') {
    const data = { ...(body as Parameters<typeof GET>[1]) }
    //@ts-ignore
    res = await GET(url, data)
  }
  if (method === 'POST') {
    const data = { ...(body as Parameters<typeof POST>[1]) }
    //@ts-ignore
    res = await POST(url, data)
  }
  if (method === 'PUT') {
    const data = { ...(body as Parameters<typeof PUT>[1]) }
    //@ts-ignore
    res = await PUT(url, data)
  }
  if (method === 'DELETE') {
    const data = { ...(body as Parameters<typeof DELETE>[1]) }
    //@ts-ignore
    res = await DELETE(url, data)
  }
  //@ts-ignore
  const { data, error } = res
  if (error) return NextResponse.json(error)

  return NextResponse.json(data)
}
