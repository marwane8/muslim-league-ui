import { PlayerData, PlayerStat, TeamData, TeamName, GameDates, Game, GameStats} from "../models";
import { API_BASE_URL, API_CLIENT_URL } from "./api-utils";

export async function getStandings(season_id: number): Promise<TeamData[]> {
    const query = "/api/v1/teams/"+ season_id  + "/standings";
    const url = API_BASE_URL + query;

    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
    
    throw Error("Season not found")
}

export async function getTeams(season_id: number): Promise<TeamName[]> {
    const query = "/api/v1/teams/" + season_id;
    const url = API_BASE_URL + query;

    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
    
    throw Error("Season not found")
}


export async function getRoster(team_id: number): Promise<PlayerData[]> {
    const query = "/api/v1/players/" + team_id;
    const url = API_CLIENT_URL + query;

    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
    
    throw Error("Team not found")
}

export async function getStatLeaders(stat: string): Promise<PlayerStat[]> {
    const query = "/api/v1/players/0/stat/" + stat;
    const url = API_BASE_URL + query;

    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
    
    throw Error("Stat not found")
}


export async function getGameDates(): Promise<GameDates> {
    const query = "/api/v1/games/dates" 
    const url = API_BASE_URL + query
    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
 
    throw Error("Stat not found")
}

export async function getGameForDate(date: number): Promise<Game[]> {
    const query = "/api/v1/games/" + date 
    const url = API_BASE_URL + query
    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
 
    throw Error("Stat not found")
}

export async function getGameStats(game_id: number): Promise<GameStats[]> {
    const query = "/api/v1/games/stats/" + game_id
    const url = API_BASE_URL + query
    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
 
    throw Error("Stat not found")
}


