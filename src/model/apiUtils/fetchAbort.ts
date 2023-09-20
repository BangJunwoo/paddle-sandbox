export const aboutGrent = (data: anyObject, timmer?: number) => {
  // react에서 시그널 불변성 보장
  const controller = new AbortController()
  // reset function (remote)
  // 취소 동작을 캡슐화해서 사용 ( 이름을 간소화하고, 호출 구조의 캡슐화 )
  const cancelRequest = () => {
    controller.abort()
  }
  if (timmer !== undefined) {
    console.log('timmer', timmer)
    setTimeout(() => controller.abort(), timmer)
  }
  // axios config
  const result = { ...data, signal: controller.signal }
  return { data: result, cancelRequest }
}
