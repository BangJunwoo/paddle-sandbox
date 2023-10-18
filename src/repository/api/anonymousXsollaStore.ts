import xsollaIds from '@/static/XSOLLA.json'
// generated from openapi-typescript
import { xsollaStoreInstance } from '@/repository/api/xsolla-interceptor'

const { GET } = xsollaStoreInstance

/*
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
