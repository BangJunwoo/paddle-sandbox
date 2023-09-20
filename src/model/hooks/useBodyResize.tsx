'use client'
import { useState, useEffect } from 'react'

export const defaultSize = 350

const useReSize = () => {
  const [width, setWidth] = useState(defaultSize)
  const [height, setHeight] = useState(defaultSize)

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        window.innerWidth
        const cr = entry.contentRect
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        // setWidth(cr.width)
      }
    })
    ro.observe(document.body)
  }, [])

  return [width, height]
}

export default useReSize
