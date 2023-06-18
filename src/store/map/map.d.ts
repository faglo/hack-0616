export type TEditTypes = 'traffic_light' | 'road' | 'building' | null
export interface IMapState {
  editType: TEditTypes,
  streetID: number | null,
}
