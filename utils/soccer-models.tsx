export type Team = {
    team_id: number,
    season_id: string, 
    team_name: string, 
    team_captain: string, 
    wins: number,
    losses: number,
    draws: number,
    goals_for: number,
    goals_against: number,
    points: number
}

export type PlayerTotals = {
    player_id: number,
    player_name: string,
    games_played: number,
    goals: number,
    assists: number
}