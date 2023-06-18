import { IPoint } from "./models/point";
import instance from './instance'

export const createPoint = (data: IPoint) => {
    return instance.post('/points', data)
}

export const getAllPoints = () => {
    return instance.get<IPoint[]>('/points/all')
}

