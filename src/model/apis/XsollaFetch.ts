'server only'

// 원본이 authFetch
import { cookies } from 'next/headers'

const getCookies = () => {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('xsollaToken')
  return accesstoken?.value
}

export const XsollaFetch = async (url: string, data: anyObject, method: string) => {
  console.log('XsollaFetch', url, data, method)

  const accesstoken = getCookies()

  const auth = async () => {
    let config = null
    if (method.toLowerCase() === 'get') {
      config = {
        method,
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accesstoken}`,
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
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(data),
        // 캐싱 유지 시간 in seconds  3600 > 1시간
        // next: { revalidate: 3600 },
        // no-store 로 설정 시 캐생하지 않음
        cache: 'no-store',
        // https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
      }
    }

    //@ts-ignore
    const response = await fetch(url, { ...config })

    const data2 = await response.json()

    return { headers: response.headers, status: response.status, statusText: response.statusText, data: data2 }
  }
  let response = await auth()
  const temp = response.data
  const result = {
    status: response.status,
    statusText: response.statusText,
    data: temp,
  }

  return result
}

export const XsollaServerFetch = async (url: string, data: anyObject, method: string) => {
  console.log('XsollaFetch', url, data, method)

  const auth = async () => {
    let config = null
    if (method.toLowerCase() === 'get') {
      config = {
        method,
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
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
        },
        body: JSON.stringify(data),
        // 캐싱 유지 시간 in seconds  3600 > 1시간
        // next: { revalidate: 3600 },
        // no-store 로 설정 시 캐생하지 않음
        cache: 'no-store',
        // https://nextjs.org/docs/app/api-reference/functions/fetch#optionscache
      }
    }

    //@ts-ignore
    const response = await fetch(url, { ...config })

    const data2 = await response.json()

    return { headers: response.headers, status: response.status, statusText: response.statusText, data: data2 }
  }
  let response = await auth()
  const temp = response.data

  const result = {
    status: response.status,
    statusText: response.statusText,
    data: temp,
  }

  return result
}
