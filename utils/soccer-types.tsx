export enum SoccerStat {
    GOALS = "goals",
    ASSISTS = "assists"
}

export const SoccerABV = {
    "goals" : "GLS",
    "assists" : "AST"
}

export type SoccerTeamData = {
    team_id: number,
    season_id: string, 
    team_name: string, 
    captain: string, 
    wins: number,
    loss: number,
    draws: number,
    goals_for: number,
    goals_against: number,
    points: number
}

