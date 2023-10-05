'use client'
import React from 'react'
import { useAppSelector } from '@/model/store/hooks'
import { selectTn } from '@/model/features/tournamentSlice'

type Props = {}

const SettingInfo = (props: Props) => {
  const data = useAppSelector(selectTn)
  return <div>{JSON.stringify(data)}</div>
}

export default SettingInfo
