import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { IMapState } from './map'
import { AppDispatch, Store } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector
export const mapStore = (state: Store): IMapState => state.map
