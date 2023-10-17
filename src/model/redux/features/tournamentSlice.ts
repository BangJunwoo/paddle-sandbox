'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/model/redux/store/store'

// Define a type for the slice state
interface Player {
  id: string
  index: number
}
interface PlayerEntry {
  [key: string]: Player
}
interface TournamentState {
  playerEntry: PlayerEntry
  playerEntrySize: number
  totalRound: number
}

// Define the initial state using that type
const initialState: TournamentState = {
  playerEntry: {},
  playerEntrySize: 1,
  totalRound: 1,
}

interface TournamentInit {
  // 숫자
  playerEntrySize: number
  // 진행할 라운드 수 > 진행해야하는 사람의 현재 상태와 , 지금까지 결정된 단위수를 알아야 함
  totalRound: number
}

export const slice = createSlice({
  name: 'tournament',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    init: (state, action: PayloadAction<TournamentInit>) => {
      state.playerEntrySize = action.payload.playerEntrySize
      state.totalRound = action.payload.totalRound
    },
  },
})

export const { init } = slice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTn = (state: RootState) => state.tournament

export default slice.reducer
