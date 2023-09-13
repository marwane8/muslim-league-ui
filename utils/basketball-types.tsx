export enum BBallStat {
    POINTS = "points",
    REBOUNDS = "rebounds",
    FOULS = "fouls"
}

export const BballABV = {
    "points" : "PTS",
    "rebounds" : "REB",
    "fouls" : "FLS"
}

export type BballTeamData = {
    team_id: number,
    team_name: string, 
    wins: number,
    loss: number,
    points_for: number,
    points_against: number,
    rebounds_total: number
}