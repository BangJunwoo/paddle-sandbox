import { cookieDelete } from '@/model/apiUtils/cookieUtils'

export const AuthFetch = async (url: string, data: anyObject, method: string) => {
  console.log('AuthFetch', url, data, method)

  const { accesstoken, refreshtoken } = data
  delete data.accesstoken
  delete data.refreshtoken

  const auth = async (repeat: boolean) => {
    let config = null
    if (method.toLowerCase() === 'get') {
      config = {
        method,
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          accesstoken: `Bearer ${accesstoken}`,
        },
        // 캐싱 유지 시간 in seconds  3600 > 1시간
        // next: { revalidate: 3600 },
        // no-store 로 설정 시 캐생하지 않음
        cache: 'no-store',
        // https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
      }
    } else {
      config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          accesstoken: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(data),
        // 캐싱 유지 시간 in seconds  3600 > 1시간
        // next: { revalidate: 3600 },
        // no-store 로 설정 시 캐생하지 않음
        cache: 'no-store',
        // https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
      }
    }

    if (repeat === true) {
      config = Object.assign(config, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          accesstoken: `Bearer ${accesstoken}`,
          refreshtoken: `Bearer ${refreshtoken}`,
        },
      })
    }
    //@ts-ignore
    const response = await fetch(url, { ...config })

    const data2 = await response.json()

    return { headers: response.headers, status: response.status, statusText: response.statusText, data: data2 }
  }
  let response = await auth(false)
  const temp = response.data
  console.log('temp', temp)
  try {
    if (temp.statusCode === 403) {
      if (temp.error === 'TOKEN_EXPIRED') {
        response = await auth(true)
      } else {
        cookieDelete('refreshtoken')
        cookieDelete('accesstoken')
        return { status: 403, statusText: temp.message, data: { error: '쿠키 삭제' } }
      }
    }
  } catch (err: any) {
    cookieDelete('refreshtoken')
    cookieDelete('accesstoken')
    return { status: 500, statusText: 'Next Server Error1', data: { ...err } }
  }
  const tempData = await response.data
  const NewAccesstoken = response.headers.get('accesstoken')
  const refresh = response.headers.get('refreshtoken')

  const result = {
    status: response.status,
    statusText: response.statusText,
    data: tempData,
  }

  if (NewAccesstoken !== null) {
    Object.assign(result, { accesstoken: NewAccesstoken })
  }
  if (refresh !== null) {
    Object.assign(result, { refreshtoken: refresh })
  }

  return result
}
