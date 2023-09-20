type anyObject = {
  [key: string]: any
}

/**
 * 클라이언트 전용
 * @param url
 * @param data
 * @returns
 */
export const NSfetch = async (data: anyObject) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  } as const

  try {
    const response = await fetch('/apis/signin', config)
    const result = await response.json()
    return { status: response.status, statusText: response.statusText, data: result }
  } catch (err: any) {
    return { status: 500, statusText: 'Next Server Error3', data: err }
  }
}

/**
 * 로그인 할 때만 사용
 * @param url
 * @param data
 * @param method
 * @returns
 */
export const loginFetch = async (url: string, data: anyObject, method: string) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  } as const
  try {
    const response = await fetch(url, config)

    const accesstoken = response.headers.get('accesstoken')
    const refreshtoken = response.headers.get('refreshtoken')
    const tempData = await response.json()
    const result = {
      data: tempData,
    }

    return { status: response.status, statusText: response.statusText, data: result, accesstoken, refreshtoken }
  } catch (err: any) {
    return { status: 500, statusText: 'Next Server Error4', data: err }
  }
}
/**
 * refreshtoken를 넣으면 새로 발급 됨
 * @param url
 * @param data
 * @param method
 * @returns
 */
