import { BballTeamData } from "../basketball-types";
import { GameStats } from "../league-types";
import { getRequest } from "./api-utils";

export async function getStandings(season_id: number,useClient=false): Promise<BballTeamData[]> {
    const standingsQuery = "/api/v1/bball/teams/" + season_id;
    return getRequest(standingsQuery,useClient);
}

export async function getGameStats(game_id: number, useClient: boolean=false): Promise<GameStats[]> {
    const gameStatsQuery = "/api/v1/bball/games/stats/teams/" + game_id
    return getRequest(gameStatsQuery,useClient);
}
