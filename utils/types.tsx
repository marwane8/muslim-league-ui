//General Interfaces That are shared amoong all leauges
export type Game = {
    season_id: number
    game_id: number,
    team1_id: number,
    team1: string,
    team2_id: number,
    team2: string,
    date: number,
    start_time: string,
    court: number,
    playoff: number
}

export type Player = {
    player_id: number, 
    team_id: number, 
    team_name: string, 
    player_name: string, 
}

export type PlayerStat = {
  game_id: number,
  player_id: number,
  player_name: string,
}

