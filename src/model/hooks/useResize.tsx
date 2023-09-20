'use client'
import { useState, useEffect, useRef } from 'react'

const useReSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect

        setWidth(cr.width)
        setHeight(cr.height)
      }
    })

    if (ref.current !== null) {
      ro.observe(ref.current)
    }
  }, [ref])

  return { width, height, ref }
}

export default useReSize
