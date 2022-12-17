export type UserData = {
    username: string,
    admin: number
}

export type PlayerData = {
    id: number,
    name: string, 
    number: number,
    pos: string 
}

export type PlayerStat = {
    id: number,
    name: string, 
    stat: string 
}

export type TeamName = {
    id: number,
    name: string
}

export type TeamData= {
    id: number,
    name: string, 
    wins: number,
    loss: number,
    points_for: number,
    points_against: number,
    rebounds_total: number,
    diff: number
}

export type GameDates= {
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

export type GameStats = {
    game_id: number,
    team_id: number,
    tame_name: string,
    points: number,
    rebounds: number,
    fouls: number
}[]