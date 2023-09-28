import { Sport, Season, TeamName, TeamData, Game, Stat, GameStats,Player,PlayerStat, PlayerGameStats, InsertGameStats, TeamStats } from "../league-types";
import { getRequest, makeAuthorizedPutRequest } from "./api-utils";
import Cookie from "js-cookie";


export async function getSeasons(sport: string, useClient: boolean=false): Promise<Season[]> {
    const seasonsQuery = "/api/v1/seasons/" + sport;
    return getRequest(seasonsQuery,useClient);
}

export async function getTeams(season_id: number,useClient=false): Promise<TeamData[]> {
    const standingsQuery = "/api/v1/teams/" + season_id;
    return getRequest(standingsQuery,useClient);
}

export async function getStandings(sport: string,season_id: number,useClient=false): Promise<TeamStats[]> {
    const standingsQuery = "/api/v1/teams/" + season_id + "/" + sport;
    return getRequest(standingsQuery,useClient);
}

export async function getRoster(team_id: number, useClient: boolean=false): Promise<Player[]> {
    const rosterQuery = "/api/v1/players/" + team_id;
    return getRequest(rosterQuery,useClient);
}

export async function getStatLeaders(season_id: number, stat: Stat,useClient: boolean=false): Promise<PlayerStat[]> {
    let statLeadersQuery =  "/api/v1/players/" + season_id + "/stat/" + stat;
    return getRequest(statLeadersQuery, useClient);
}

export async function getGamesForSeason(season_id: number,useClient: boolean=false): Promise<Game[]> {
    const gamesQuery = "/api/v1/games/season/" + season_id;
    return getRequest(gamesQuery,useClient);
}

export async function getGameDates(season_id: number,useClient: boolean=false): Promise<number[]> {
    const gameDatesQuery = "/api/v1/games/" + season_id + "/dates";
    return getRequest(gameDatesQuery,useClient);
}

export async function getGamesForDate( date: number, useClient: boolean=false): Promise<Game[]> {
    const gamesForDateQuery = "/api/v1/games/" + date;
    return getRequest(gamesForDateQuery, useClient);
}

export async function getPlayerGameStats(game_id: number, useClient: boolean=false): Promise<PlayerGameStats[]> { 
    const gamePlayerStatsquery = "/api/v1/games/stats/players/" + game_id;
    return getRequest(gamePlayerStatsquery,useClient);
}

export async function insertGamesForSeason(gameStats: InsertGameStats[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    const statLeadersQuery = "/api/v1/stats/upsert";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,gameStats,useClient);
}

export async function upsertRoster(roster: Player[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    const statLeadersQuery =  "/api/v1/roster/upsert";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,roster,useClient);
}

export async function updateTeamStats(teams: number[], useClient: boolean=false): Promise<any> {
    const jwt: string = Cookie.get('token');
    const statLeadersQuery =  "/api/v1/stats/teams";
    return makeAuthorizedPutRequest(jwt,statLeadersQuery,teams,useClient);
}