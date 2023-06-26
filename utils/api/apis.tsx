import { Game, GameStat,Season } from "../league-types";
import { getRequest, makeAuthorizedPutRequest } from "./api-utils";
import Cookie from "js-cookie";

export async function getSeasons(sport: string, useClient: boolean=false): Promise<Season[]> {
    const seasonsQuery = "/api/v1/" + sport + "/seasons";
    return getRequest(seasonsQuery,useClient);
}

export async function getGamesForSeason(sport: string, season_id: number,useClient: boolean=false): Promise<Game[]> {
    const statLeadersQuery = "/api/v1/" + sport + "/games/season/" + season_id;
    return getRequest(statLeadersQuery,useClient);
}

export async function insertGamesForSeason(sport: string, gameStats: GameStat[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    const statLeadersQuery = "/api/v1/" + sport + "/stats/insert";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,gameStats,useClient);
}