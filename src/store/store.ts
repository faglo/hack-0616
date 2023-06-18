import { configureStore } from '@reduxjs/toolkit'
import { mapSlice } from './map'

export const store = configureStore({
  reducer: {
    [mapSlice.name]: mapSlice.reducer,
  },
  devTools: true,
})

export type Store = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
