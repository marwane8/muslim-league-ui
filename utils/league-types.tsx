//General Interfaces That are shared amoong all leauges
export type Season = {
    season_id: number, 
    season_name: string, 
    year: number
}

export const makeSeasonOptions = (season: Season) => {
    const season_value = season.season_name.toUpperCase() + " " + season.year
    let season_option = {
      key: season.season_id,
      value: season_value
    }
    return season_option
  }



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

export type GameStat = {
  game_id: number,
  player_id: number,
  [key: string]: number | string
}


