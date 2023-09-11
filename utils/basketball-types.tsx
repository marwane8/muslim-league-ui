export enum BBallStat {
    POINTS = "points",
    REBOUNDS = "rebounds"
}

export const BballStatCols: string[] = ['points','rebounds','fouls'];

export type BballTeamData = {
    team_id: number,
    team_name: string, 
    wins: number,
    loss: number,
    points_for: number,
    points_against: number,
    rebounds_total: number,
}