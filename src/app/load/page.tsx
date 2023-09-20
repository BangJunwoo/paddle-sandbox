'use client'
import React from 'react'
import useLoading from './useLoading'
import useLoadingExtends from '@/model/apiUtils/loadingExtends'

const MyComponent = () => {
  const { isLoading, executeWithLoading } = useLoadingExtends()

  // 예제
  const fetchData = async () => {
    // 여기에서 비동기 작업을 수행, 예: API 요청
    await new Promise((resolve) => setTimeout(resolve, 2000)) // 예시로 2초 대기

    return 'string'
  }

  const handleButtonClick = async () => {
    const result = await executeWithLoading(fetchData)
    // fetchData가 실행될 때 로딩 상태가 true로 설정되고,
    // fetchData 실행 완료 후 로딩 상태가 다시 false로 설정됩니다.
    console.log(result)
  }

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      <button onClick={handleButtonClick}>Fetch Data</button>
    </div>
  )
}

export default MyComponent
