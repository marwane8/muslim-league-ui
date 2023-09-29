
export type User = {
    username: string,
    admin: number
}

export const Sport: { [key: number]: string } = {
    1: "basketball",
    2: "soccer"
}

export const SportID: { [key: string]: number } = {
    "basketball" : 1,
    "soccer" : 2
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

export type TeamName = {
    id: number,
    name: string
}

export const makeTeamOptions = (team: TeamName | TeamStats ) => {
    let team_option = {
      key: team.id,
      value: team.name 
    }
    return team_option
}

export type TeamStats = BballTeamStats | SoccerTeamStats
export type BballTeamStats = {
  id: number,
  season_id: number,
  name: string
  wins: number,
  losses: number,
  points_for: number,
  points_against: number,
  rebounds: number,
  fouls: number
}
type SoccerTeamStats = {
  id: number,
  season_id: number,
  name: string
  wins: number,
  losses: number,
  goals_for: number,
  goals_against: number,
  assists: number,
  points: number
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

export type Game = {
    sport_id: number
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


export type PlayerStat = {
    season_id: number,
    player_id: number,
    name: string, 
    stat_records: number,
    dnp: number,
    type: string,
    stat: number 
}

export type TeamGameStats = {
  t_id: number,
  team_name: string,
  g_id: number,
  type1: number,
  stat1_total: number,
  type2: number,
  stat2_total: number,
  type3: number,
  stat3_total : number
}

export type PlayerGameStats = {
    game_id : number,
    team_id : number,
    team_name : string,
    player_id : number,
    stat_id : number,
    player_name : string,
    dnp: number,
    type1 : string,
    stat1 : number,
    type2 : string,
    stat2 : number,
    type3 : string,
    stat3  : number
}

export type StatUpsert = {
    id?: number,
    sport_id: number,
    game_id: number,
    player_id: number,
    dnp: number,
    stat1_type: string,
    stat1: number,
    stat2_type: string,
    stat2: number,
    stat3_type: string,
    stat3: number
}


