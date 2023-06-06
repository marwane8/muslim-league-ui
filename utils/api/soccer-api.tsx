import { PlayerTotals, Player, Team } from "../soccer-models";
import { getRequest } from "./api-utils";

//-----
// Team Endpoints
//-----
export async function getTeams(season_id: number): Promise<Team[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id;
    return getRequest(standingsQuery);
}

export async function getStandings(season_id: number): Promise<Team[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id  + "/standings";
    return getRequest(standingsQuery);
}

//-----
// Player Endpoints
//-----
export async function getRoster(team_id: number): Promise<Player[]> {
    const rosterQuery = "/api/v1/soccer/players/" + team_id;
    return getRequest(rosterQuery,true);
}

export async function getStatLeaders(stat: string): Promise<PlayerTotals[]> {
    const statLeadersQuery = "/api/v1/soccer/players/0/stat/" + stat;
    return getRequest(statLeadersQuery);
}
