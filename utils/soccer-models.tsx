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

export type Player = {
    player_id: number, 
    team_id: number, 
    team_name: string, 
    player_name: string, 
    player_number: string, 
    player_pos: string
}



export type PlayerTotals = {
    player_id: number,
    player_name: string,
    games_played: number,
    goals: number,
    assists: number
}