import 'server-only'

import { NextResponse } from 'next/server'
import { create } from '@/model/apiUtils/cookieUtils'
import { loginFetch } from '@/model/apis/fetch'
import { AuthFetch } from '@/model/apis/authFetch'
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
  // const { searchParams } = new URL(request.url)

  const body = await request.json()
  if (typeof body.server === 'undefined') {
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: 'apis/signin',
      }
    )
  }
  // 검증
  const { auth, url, queryString, method } = body.server
  //
  delete body.server
  let res
  if (auth) {
    // auth 에서 request 에서 cookies 정보 얻어야댐

    const data = { ...body, ...getCookies() }
    res = await AuthFetch(`https://app-api.stepinft.com/${url}${queryString}`, data, method)
    // 서버에다 인증할 일이 생기면 갱신된다 ( 서버 발신 시간과 쿠키 등록 시간이 편차가 있어서 서버보다 일찍 없어질 일은 없을 듯)
    // 어짜피 인증이 필요한 작업이 수행 되면 토큰이 갱신되기 때문에 업데이트 받아야함
  } else {
    res = await loginFetch(`https://app-api.stepinft.com/${url}${queryString}`, body, method)
  }

  // 만료되도 전달해야하기 때문에 ... 설정
  const refreshAge = 60 * 60 * 24 * 14
  if ('accesstoken' in res && res.accesstoken !== undefined && res.accesstoken !== null) {
    // 만료된 accesstoken 를 가져가야하면 리프레쉬란 같은 주기로 세팅
    create({ name: 'accesstoken', value: res.accesstoken, httpOnly: true, maxAge: refreshAge, secure: true })
  }

  if ('refreshtoken' in res && res.refreshtoken !== undefined && res.refreshtoken !== null) {
    create({
      name: 'refreshtoken',
      value: res.refreshtoken,
      httpOnly: true,
      maxAge: refreshAge,
      secure: true,
    })
  }
  console.log('res.data::', `https://app-api.stepinft.com/${url}${queryString}`, res.data, {
    status: res.status,
    statusText: res.statusText,
  })

  const { data, status } = res

  return NextResponse.json(data, {
    status,
  })
}
