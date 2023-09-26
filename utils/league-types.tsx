import { BBallStat, BballTeamData } from "./basketball-types"
import { SoccerStat, SoccerTeamData } from "./soccer-types"

//General Interfaces That are shared amoong all leauges
export enum Sport {
    SOCCER = "soccer",
    BASKETBALL = "bball"
}

export type Season = {
    id: number, 
    sport_id: number,
    name: string, 
    year: number
}

export const makeSeasonOptions = (season: Season) => {
    const season_value = season.name.toUpperCase() + " " + season.year
    let season_option = {
      key: season.id,
      value: season_value
    }
    return season_option
}

export type TeamData = {
    id: number,
    season_id: number,
    name: string,
    captain_id: number,
    year: number
    stats_obj: TeamStats
}

export type TeamStats = BballTeamStats | SoccerTeamStats

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

type BballTeamStats = {
  wins: number,
  losses: number,
  points_for: number,
  points_against: number,
  rebounds: number,
  fouls: number
}
type SoccerTeamStats = {
  wins: number,
  losses: number,
  goals_for: number,
  goals_against: number,
  assists: number,
  points: number
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



export const makeSportSeason = (sport: Sport,season: Season) => {

    let sport_season_option = {
        sport: sport,
        season_id: season.id, 
        season_name: season.name, 
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
    playoff: number,
    played: number
}



export type Player = {
    player_id?: number, 
    team_id: number, 
    team_name: string, 
    active: number,
    f_name: string, 
    l_name: string, 
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
  dnp: number,
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


export type InsertGameStats = {
  stat_id?: number,
  game_id: number,
  player_id: number,
  dnp: number,
  [key: string]: number | string | undefined,
}


