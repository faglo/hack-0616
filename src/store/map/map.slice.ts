import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMapState, TEditTypes } from './map.d'

const initialState: IMapState = {
  editType: null,
  streetID: null,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setEditType: (state, { payload }: PayloadAction<TEditTypes>) => ({
      ...state,
      editType: payload,
    }),
    setStreetID: (state, { payload }: PayloadAction<number | null>) => ({
      ...state,
      streetID: payload,
    }),
  }
})

export const { setEditType, setStreetID } = mapSlice.actions
