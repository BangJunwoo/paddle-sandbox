import { NSfetch } from '@/model/apis/fetch'

export type ServerFetchOption = {
  auth: boolean
  url: string
  queryString: string
  method: string
}

// import { joinWithSlash, objectToQueryString } from '@/model/apis/urlUtils'
// const server = {
//   auth: true,
//   url: joinWithSlash('auth/user'),
//   queryString: objectToQueryString({ abc: 10 }),
//   method: 'POST',
// }

export interface ServerFetchBody {
  [key: string]: any
  server: ServerFetchOption
}

export const StepinCall = async (server: ServerFetchOption, body: any) => {
  const res = await NSfetch({
    server,
    ...body,
  })
  return res
}
