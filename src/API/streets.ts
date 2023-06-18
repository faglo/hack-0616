import { ISteet, ISteetPred } from './models/street'
import instance from './instance'

export const createStreet = (data: ISteet) => {
    return instance.post('/streets', data)
}

export const getAllStreets = () => {
    return instance.get<ISteet[]>('/streets/all')
}
 
export const getAllStreetsWithTraffic = (date: number) => {
    if (date < 10) {
        return instance.get<ISteetPred[]>(`/streets/predict?date=2023-06-0${date}T08%3A20%3A24.419`)
    }
    return instance.get<ISteetPred[]>(`/streets/predict?date=2023-06-${date}T08%3A20%3A24.419`)
}

export const getAllStreetsWithTrafficByStreeet = (streetID: number) => {
    return instance.get<ISteetPred[][]>(`/streets/predict/${streetID}/month`)
}
