'use client'
import React, { useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/model/dexie/dexie'

type Props = {}

const SettingInfo = (props: Props) => {
  const user = useLiveQuery(() => db.user.toArray())
  const round = useLiveQuery(() => db.round.toArray())
  const matchUp = useLiveQuery(() => db.matchUp.toArray())

  return (
    <div>
      <div>
        <h2>user</h2>
        {user?.map((item) => {
          return (
            <div key={item.id} style={{ display: 'flex' }}>
              <h2 style={{ border: '1px solid #000' }}>{item.id}</h2>
              <span style={{ border: '1px solid #000' }}>{item.minRank}</span>
            </div>
          )
        })}
      </div>
      <div>
        <h2>round</h2>
        {round?.map((item) => {
          return (
            <div key={item.id} style={{ display: 'flex' }}>
              <h2 style={{ border: '1px solid #000' }}>{item.id}</h2>
              <span style={{ border: '1px solid #000' }}>{item.progress}</span>
              <span style={{ border: '1px solid #000' }}>{item.size}</span>
              <span style={{ border: '1px solid #000' }}>{item.isLoserMatch ? 'O' : 'X'}</span>
            </div>
          )
        })}
      </div>
      <div>
        <h2>matchUp</h2>
        {matchUp?.map((item) => {
          return (
            <div key={item.id} style={{ display: 'flex' }}>
              <h2 style={{ border: '1px solid #000' }}>{item.id}</h2>
              <span style={{ border: '1px solid #000' }}>{item.round}</span>
              <span style={{ border: '1px solid #000' }}>{item.roundNumber}</span>
              <span style={{ border: '1px solid #000' }}>{item.A}</span>
              <span style={{ border: '1px solid #000' }}>{item.B}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SettingInfo
