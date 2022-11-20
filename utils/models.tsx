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