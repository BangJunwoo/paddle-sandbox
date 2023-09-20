import { useRef } from 'react'

export const useAboutGrent = (data: anyObject, timmer?: number) => {
  // react에서 시그널 불변성 보장
  const controllerRef = useRef(new AbortController())
  // reset function (remote)
  controllerRef.current = new AbortController()
  // 취소 동작을 캡슐화해서 사용 ( 이름을 간소화하고, 호출 구조의 캡슐화 )
  const cancelRequest = () => {
    controllerRef.current.abort()
  }
  if (timmer !== undefined) {
    setTimeout(() => controllerRef.current.abort(), timmer)
  }
  // axios config
  const result = { ...data, signal: controllerRef.current.signal }
  return { data: result, cancelRequest }
}
