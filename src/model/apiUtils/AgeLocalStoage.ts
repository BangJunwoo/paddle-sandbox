'use client'

import { compareToCurrent, setAccessAge } from './UTCutil'

export const saveAccessAgeStorage = () => {
  // accessAge를 저장
  const accessAge = 1000 * 60 * 60 * 30 // 저장할 값 (예: 30분)
  const value = setAccessAge(accessAge)
  localStorage.setItem('accessAge', value.toString())
}

/**
 * 5분 이하 ( 마이너스 포함으로) 남았거나 , 없을 때 true
 * @returns boolean
 */
export const getAccessAgeStorage = () => {
  // accessAge를 불러오기
  const savedAccessAge = localStorage.getItem('accessAge')

  // 로컬 스토리지에서 불러온 값이 null이 아닌지 확인하고 사용
  if (savedAccessAge !== null) {
    const accessAge = parseInt(savedAccessAge) // 문자열을 정수로 변환

    return compareToCurrent(new Date(accessAge))
  } else return true
}
