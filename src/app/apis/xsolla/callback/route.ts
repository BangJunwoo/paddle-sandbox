import 'server-only'

import { create } from '@/model/apiUtils/cookieUtils'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const start = Date.now()
  console.time(String(start))
  const { searchParams } = new URL(request.url)
  console.log('searchParams', searchParams)
  const token = searchParams.get('token')
  const remember = searchParams.get('remember_me')

  if (token && remember === 'true') {
    const twoWeek = 60 * 60 * 24 * 14
    await create({
      name: 'xsollaToken',
      value: token,
      httpOnly: true,
      maxAge: twoWeek,
      secure: true,
    })
    console.timeEnd(String(start))
    redirect('/')
  } else redirect('/fail')

  // auth 에서 request 에서 cookies 정보 얻어야댐
}
