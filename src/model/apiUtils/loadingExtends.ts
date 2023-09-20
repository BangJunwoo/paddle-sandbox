import React, { useState, useCallback } from 'react'
import { flushSync } from 'react-dom'

type Props = {}

const loadingExtends = () => {
  const [isLoading, setLoad] = useState(false)
  const executeWithLoading = useCallback(async (promiseFunction: () => Promise<any>) => {
    flushSync(() => {
      setLoad(true)
    })
    try {
      const result = await promiseFunction()
      return result
    } finally {
      setLoad(false)
    }
  }, [])

  return { isLoading, executeWithLoading }
}

export default loadingExtends

// 이 이후는 어떻게 만들지...
// useAwait()
