import { BBallStat, BballTeamData } from "./basketball-types"
import { SoccerStat, SoccerTeamData } from "./soccer-types"

//General Interfaces That are shared amoong all leauges
export enum Sport {
    SOCCER = "soccer",
    BASKETBALL = "bball"
}

export function stringToEnum(input: string) {
  switch (input) {
    case "soccer":
      return Sport.SOCCER;
    case "bball":
      return Sport.BASKETBALL;
    default:
      throw new Error(`Invalid input: ${input}`);
  }
}


export type Stat = BBallStat | SoccerStat
export type TeamData = BballTeamData | SoccerTeamData

export type User = {
    username: string,
    admin: number
}

export type SportSeason = {
    sport: Sport
    season_id: number, 
    season_name: string, 
    year: number
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

export const makeSportSeason = (sport: Sport,season: Season) => {

    let sport_season_option = {
        sport: sport,
        season_id: season.season_id, 
        season_name: season.season_name, 
        year: season.year 
    }
    
    return sport_season_option
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
    team_id: number,
    team_name: string
}

export const makeTeamOptions = (team: TeamName) => {
    let team_option = {
      key: team.team_id,
      value: team.team_name 
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

export type PlayerGameStats = {
  game_id: number,
  team_id: number,
  team_name: string,
  player_id: number,
  player_name: string,
  stat_id?: number,
  dnp: number,
  [key: string]: number | string | undefined,
}


