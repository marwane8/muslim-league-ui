import { Game, GameStat,Season,PlayerStat } from "../league-types";
import { getRequest, makeAuthorizedPutRequest } from "./api-utils";
import Cookie from "js-cookie";


export enum Sport {
    SOCCER,
    BASKETBALL
}


export async function getSeasons(sport: Sport, useClient: boolean=false): Promise<Season[]> {
    let sportEndpoint = getEndPoint(sport);
    const seasonsQuery = sportEndpoint + "/seasons";
    return getRequest(seasonsQuery,useClient);
}

export async function getStatLeaders(sport: Sport, season_id: number, stat: string,useClient: boolean=false): Promise<PlayerStat[]> {
    let sportEndpoint = getEndPoint(sport);
    const statLeadersQuery =  sportEndpoint + "/players/" + season_id + "/stat/" + stat;
    return getRequest(statLeadersQuery,useClient);
}

export async function getGamesForSeason(sport: Sport, season_id: number,useClient: boolean=false): Promise<Game[]> {
    let sportEndpoint = getEndPoint(sport);
    const statLeadersQuery = sportEndpoint + "/games/season/" + season_id;
    return getRequest(statLeadersQuery,useClient);
}

export async function insertGamesForSeason(sport: Sport, gameStats: GameStat[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    let sportEndpoint = getEndPoint(sport);
    const statLeadersQuery = sportEndpoint + "/stats/insert";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,gameStats,useClient);
}

function getEndPoint(sport: Sport): string {
    let query = "/api/v1/"
    switch (sport) {
      case Sport.BASKETBALL:
        return query + 'bball';
      case Sport.SOCCER:
        return query + 'soccer';
      default:
        return query + 'bball';
    }
}