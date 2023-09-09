export enum BBallStat {
    POINTS = "points",
    REBOUNDS = "rebounds"
}

export type TeamData = {
    id: number,
    name: string, 
    wins: number,
    loss: number,
    points_for: number,
    points_against: number,
    rebounds_total: number,
}