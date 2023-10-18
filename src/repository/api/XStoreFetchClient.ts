import xsollaIds from '@/XSOLLA.json'
// generated from openapi-typescript
import { paths } from '@/repository/@types/xsollaStore'

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
export const XStoreFetch = async (data: ServerFetchBody) => {
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
    return { status: 500, statusText: 'Next Server XStorefetch Error', data: err }
  }
}

/**
 * 클라이언트 테스트 코드
 * 클라이언티에서 이렇게 XS를 쓰면 된다는 걸 보여주기 위한 예시
 * @returns
 */
export const TestItems = async () => {
  const project_id = xsollaIds.projectId
  const data = await XStoreFetch({
    params: {
      path: { project_id: project_id },
    },
    server: { url: '/v2/project/{project_id}/items', method: 'GET' },
  })
  return data
}

/**
 * '/v2/project/{project_id}/cart'
 * @returns
 */
export const openCart = async () => {
  const project_id = xsollaIds.projectId

  const data = await XStoreFetch({
    params: {
      path: { project_id: project_id },
      query: {
        currency: 'USD',
        locale: 'en',
      },
    },
    server: { url: '/v2/project/{project_id}/cart', method: 'GET' },
  })
  return data
}

/**
 * '/v2/project/{project_id}/cart'
 * @returns
 */
export const addCart = async (sku: string, quantity: number) => {
  const project_id = xsollaIds.projectId

  const data = await XStoreFetch({
    params: {
      path: { project_id: project_id, item_sku: sku },
    },
    body: {
      quantity: quantity,
    },
    server: { url: '/v2/project/{project_id}/cart/item/{item_sku}', method: 'PUT' },
  })
  return data
}

export const deleteCart = async () => {
  const project_id = xsollaIds.projectId

  const data = await XStoreFetch({
    params: {
      path: { project_id: project_id },
    },

    server: { url: '/v2/project/{project_id}/cart/clear', method: 'PUT' },
  })
  return data
}

export const createOrder = async () => {
  const project_id = xsollaIds.projectId
  const user = {
    id: '81716380-9356-427f-9e0e-0f7a6f6ae953',
    name: null,
    email: 'mineclover@naver.com',
    country: 'US',
  }
  const data = await XStoreFetch({
    params: {
      path: { project_id: project_id },
    },
    body: {
      sandbox: true,
      settings: {
        ui: {
          theme: '63295a9a2e47fab76f7708e1',
          desktop: {
            header: {
              is_visible: true,
              visible_logo: true,
              visible_name: true,
              visible_purchase: true,
              type: 'normal',
              close_button: false,
            },
          },
        },
      },
    },
    user,

    server: { url: '/v2/project/{project_id}/payment/cart', method: 'POST' },
  })
  return data
}
