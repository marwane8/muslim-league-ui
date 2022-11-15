import { PlayerData, TeamData } from "../models";
import { API_BASE_URL } from "./api-utils";

export async function getStandings(season_id: number): Promise<TeamData[]> {
    const query = "/api/v1/teams/standings/" + season_id;
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

export async function getRoster(team_id: number): Promise<PlayerData> {
    const query = "/api/v1/teams/roster/" + team_id;
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
    
    throw Error("Team not found")
}
