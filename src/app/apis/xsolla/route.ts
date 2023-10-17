import 'server-only'

import { NextResponse } from 'next/server'
// 쿠키는 XsollaFetch 에서 가져옴
import { XsollaFetch, XsollaServerFetch } from '@/model/apis/XsollaFetch'

export async function POST(request: Request) {
  // const { searchParams } = new URL(request.url)

  const body = await request.json()
  if (typeof body.server === 'undefined') {
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: 'apis/xsolla',
      }
    )
  }
  // 검증
  const { auth, url, queryString, method } = body.server
  delete body.server
  let res
  if (auth) {
    // auth 에서 request 에서 cookies 정보 얻어야댐
    const data = { ...body }
    res = await XsollaFetch(`${url}${queryString}`, data, method)
    // 서버에다 인증할 일이 생기면 갱신된다 ( 서버 발신 시간과 쿠키 등록 시간이 편차가 있어서 서버보다 일찍 없어질 일은 없을 듯)
    // 어짜피 인증이 필요한 작업이 수행 되면 토큰이 갱신되기 때문에 업데이트 받아야함
  } else {
    const data = { ...body }
    res = await XsollaServerFetch(`${url}${queryString}`, data, method)
  }

  // 만료되도 전달해야하기 때문에 ... 설정

  return NextResponse.json(res)
}
