'use client'

import React, { useEffect, useState } from 'react'
import Xsolla from '@/repository/provider/xsolla'
import { useSearchParams } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
  const searchParams = useSearchParams()
  const [access, setAccess] = useState<string>('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) setAccess(token)
  }, [access, searchParams])

  return <Xsolla access_token={access}>a</Xsolla>
}

export default page
