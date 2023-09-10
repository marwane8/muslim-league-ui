import { getRequest } from "./api-utils";
import { SoccerTeamData } from "../soccer-types";
import { GameStats } from "../league-types";
//-----
// Team Endpoints
//-----

export async function getStandings(season_id: number, useClient: boolean=false): Promise<SoccerTeamData[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id;
    return getRequest(standingsQuery,useClient);
}



//-----
// Games Endpoints
//-----

export async function getGameStats(game_id: number, useClient: boolean=false): Promise<GameStats[]> {
    const gameStatsQuery = "/api/v1/soccer/games/stats/" + game_id
    return getRequest(gameStatsQuery,useClient);
}
