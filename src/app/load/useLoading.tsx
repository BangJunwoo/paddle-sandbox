import { useState, useCallback } from 'react'

// use 프라미스 sample
const useLoading = () => {
  const [isLoading, setLoading] = useState(false)

  const executeWithLoading = useCallback(async (promiseFunction: any) => {
    setLoading(true)
    try {
      const result = await promiseFunction()
      return result
    } finally {
      setLoading(false)
    }
  }, [])

  return { isLoading, executeWithLoading }
}

export default useLoading
