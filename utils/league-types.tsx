import { BBallStat } from "./basketball-types"
import { SoccerStat } from "./soccer-types"

//General Interfaces That are shared amoong all leauges
export enum Sport {
    SOCCER = "soccer",
    BASKETBALL = "bball"
}

export type Stat = BBallStat | SoccerStat

export type User = {
    username: string,
    admin: number
}

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

export type TeamName = {
    id: number,
    name: string
}

export const makeTeamOptions = (team: TeamName) => {
    let team_option = {
      key: team.id,
      value: team.name 
    }
    return team_option
}

export type Player = {
    player_id: number, 
    team_id: number, 
    team_name: string, 
    name: string, 
    number: string,
    pos: string
}

export type PlayerStat = {
    id: number,
    name: string, 
    games: number,
    stat: number 
}

export type GameStats = {
  game_id: number,
  player_id: number,
  [key: string]: number | string
}

