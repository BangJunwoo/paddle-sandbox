// listenerMiddleware.ts
import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

// export const startAppListening = listenerMiddleware.startListening as AppStartListening
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    console.log('predicate:', action, currentState, previousState)
    return true
  },
  effect: (action, listenerApi) => {
    const user = listenerApi.getState()
    console.log('meta', action.meta)
    console.log('getState', action, user)
  },
})

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>
