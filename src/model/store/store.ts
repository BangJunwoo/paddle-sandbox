import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'

import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { listenerMiddleware } from './listenerMiddleware'
// ...
import tnReducer from '../features/tournamentSlice'
import counterReducer from '../features/counterSlice'

const reducer = {
  counter: counterReducer,
  tournament: tnReducer,
}

const preloadedState = {
  counter: {
    value: 100,
  },
}

const debounceNotify = _.debounce((notify) => notify())

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
