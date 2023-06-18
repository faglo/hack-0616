export interface IPoint {
    point: [any]
    type: "alert" | "critical" | "normal" | "simple",
    radius: number,
    description: string,
    fromTime: string,
    toTime: string,
    id?: number,
}