import xsollaIds from '@/static/XSOLLA.json'
// generated from openapi-typescript
import { xsollaStoreInstance } from '@/repository/api/xsolla-interceptor'
import { paths } from '@/repository/@types/xsollaStore'

const { GET } = xsollaStoreInstance

export type ServerFetchOption = {
  url: keyof paths
  method: 'GET' | 'PUT' | 'POST' | 'DELETE'
}

export interface ServerFetchBody {
  [key: string]: any
  server: ServerFetchOption
}

/**
 * 클라이언트 용 인터셉터
 * 서버를 한 번 거쳐서 쿠키 읽게끔 구성됨
 * @param data
 * @returns
 */
export const XSfetch = async (data: ServerFetchBody) => {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/apis/xsolla/v2`, config)
    const result = await response.json()
    return result
  } catch (err: any) {
    return { status: 500, statusText: 'Next Server Error3', data: err }
  }
}

/**
 * 클라이언트 테스트 코드
 * 클라이언티에서 이렇게 XS를 쓰면 된다는 걸 보여주기 위한 예시
 * @returns
 */
export const TestItems = async () => {
  const project_id = xsollaIds.projectId
  const data = await XSfetch({
    params: {
      path: { project_id: project_id },
    },
    server: { url: '/v2/project/{project_id}/items', method: 'GET' },
  })
  return data
}
/**
 * '/v2/project/{project_id}/items' 서버에서 쓸 때 예시
 * 서버렌더링에 사용되는 조회 쿼리는 엑세스 토큰이 필요하지 않기 때문에 일단 선언함
 * 필요해지면 따로 분리한 뒤 server only를 넣어서 관리
 * @returns
 */
export const getItems = async () => {
  const project_id = xsollaIds.projectId
  const { data, error } = await GET('/v2/project/{project_id}/items', {
    params: {
      path: { project_id: project_id },
    },
    next: { revalidate: 3600 },
  })
  if (error) return error
  return data
}
