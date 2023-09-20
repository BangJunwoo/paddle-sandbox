// import 'server-only'

import axios from 'axios'

type Response = any

// https://axios-http.com/kr/docs/api_intro

// axios.[method](url[, data[, config]])
export const axiosPost = async (url: string, data: anyObject) => {
  try {
    const { data: json } = await axios.post<Response>(url, data, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })

    return json
  } catch (err: any) {
    console.error('err', err)

    return { error: err }
  }
}

// axios.[method](url[, config])
export const axiosGet = async (url: string, data: anyObject) => {
  try {
    const { data: json } = await axios.get<Response>(url, {
      data,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    return json
  } catch (err: any) {
    console.error('err', err)

    return { error: err }
  }
}

// search parmas
// url params
