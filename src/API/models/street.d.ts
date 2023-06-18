export interface ISteet {
  point: [any]
  street: string,
  id?: number,
}

export interface ISteetPred {
  point: [any]
  street: string,
  predictions: number,
  id?: number,
  date?: string,
}