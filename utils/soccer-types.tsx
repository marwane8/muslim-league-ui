export enum SoccerStat {
    GOALS,
    ASSISTS
}

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

export type GameDates = {
    games: number[]
}

export type Game = {
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

export type GameStat = {
    game_id: number,
    team_id: number,
    tame_name: string,
    goals: number,
    assists: number
}

export const makeRoster = (player: Player) => {
    let player_info = {
        id: player.player_id,
        name: player.player_name, 
        number: player.player_number,
        pos: player.player_pos 
    }
    return player_info
}

export const makeTeamOptions = (team: Team) => {
    let team_option = {
      key: team.team_id,
      value: team.team_name
    }
    return team_option
}


