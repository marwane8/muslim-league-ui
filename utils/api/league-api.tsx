import { Sport, Season, TeamName, Game, Stat, GameStats,Player,PlayerStat, PlayerGameStats } from "../league-types";
import { getRequest, makeAuthorizedPutRequest } from "./api-utils";
import Cookie from "js-cookie";


export async function getSeasons(sport: Sport, useClient: boolean=false): Promise<Season[]> {
    let sportEndpoint = getEndPoint(sport);
    const seasonsQuery = sportEndpoint + "/seasons";
    return getRequest(seasonsQuery,useClient);
}

export async function getTeamNames(sport: Sport,  season_id: number, useClient: boolean=false): Promise<TeamName[]> {
    let sportEndpoint = getEndPoint(sport);
    const teamNamesQuery = sportEndpoint + "/teams/" + season_id;
    return getRequest(teamNamesQuery, useClient);
}

export async function getRoster(sport: Sport,  team_id: number, useClient: boolean=false): Promise<Player[]> {
let sportEndpoint = getEndPoint(sport);
    const rosterQuery = sportEndpoint + "/players/" + team_id;
    return getRequest(rosterQuery,useClient);
}

export async function getStatLeaders(sport: Sport, season_id: number, stat: Stat,useClient: boolean=false): Promise<PlayerStat[]> {
    let sportEndpoint = getEndPoint(sport);
    let statLeadersQuery =  sportEndpoint + "/players/" + season_id + "/stat/" + stat;
    return getRequest(statLeadersQuery, useClient);
}

export async function getGamesForSeason(sport: Sport, season_id: number,useClient: boolean=false): Promise<Game[]> {
    let sportEndpoint = getEndPoint(sport);
    const statLeadersQuery = sportEndpoint + "/games/season/" + season_id;
    return getRequest(statLeadersQuery,useClient);
}

export async function getGameDates(sport: Sport, season_id: number,useClient: boolean=false): Promise<number[]> {
    let sportEndpoint = getEndPoint(sport);
    const gameDatesQuery = sportEndpoint + "/games/" + season_id + "/dates";
    return getRequest(gameDatesQuery,useClient);
}

export async function getGamesForDate( sport: Sport, date: number, useClient: boolean=false): Promise<Game[]> {
    let sportEndpoint = getEndPoint(sport);
    const gamesForDateQuery = sportEndpoint + "/games/" + date;
    return getRequest(gamesForDateQuery, useClient);
}

export async function insertGamesForSeason(sport: Sport, gameStats: GameStats[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    let sportEndpoint = getEndPoint(sport);
    const statLeadersQuery = sportEndpoint + "/stats/insert";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,gameStats,useClient);
}

export async function getPlayerGameStats(sport: Sport, game_id: number, useClient: boolean=false): Promise<PlayerGameStats[]> { 
    let sportEndpoint = getEndPoint(sport);
    const gamePlayerStatsquery = sportEndpoint + "/games/stats/players/" + game_id;
    return getRequest(gamePlayerStatsquery,useClient);
}
function getEndPoint(sport: Sport): string {
    let query = "/api/v1/"
    return query + sport;
}