import { Season, PlayerTotals, Player, Team, Game, GameDates, GameStat } from "../soccer-types";
import { getRequest } from "./api-utils";

//-----
// Season Endpoints
//-----
export async function getSeasons(): Promise<Season[]> {
    const seasonsQuery = "/api/v1/soccer/seasons";
    return getRequest(seasonsQuery);
}


//-----
// Team Endpoints
//-----
export async function getTeams(season_id: number): Promise<Team[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id;
    return getRequest(standingsQuery);
}

export async function getStandings(season_id: number, useClient: boolean=false): Promise<Team[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id  + "/standings";
    return getRequest(standingsQuery,useClient);
}

//-----
// Player Endpoints
//-----
export async function getRoster(team_id: number, useClient:boolean=false): Promise<Player[]> {
    const rosterQuery = "/api/v1/soccer/players/" + team_id;
    return getRequest(rosterQuery,useClient);
}

export async function getStatLeaders(season_id: number, stat: string,useClient: boolean=false): Promise<PlayerTotals[]> {
    const statLeadersQuery = "/api/v1/soccer/players/" + season_id + "/stat/" + stat;
    return getRequest(statLeadersQuery,useClient);
}

//-----
// Games Endpoints
//-----
export async function getGameDates(season_id: number): Promise<GameDates> {
    const gameDatesQuery = "/api/v1/soccer/games/" + season_id + "/dates";
    return getRequest(gameDatesQuery);
}

export async function getGameForDate(date: number): Promise<Game[]> {
    const gamesForDateQuery = "/api/v1/soccer/games/" + date;
    return getRequest(gamesForDateQuery);
}

export async function getGameStats(game_id: number): Promise<GameStat[]> {
    const gameStatsQuery = "/api/v1/soccer/games/stats/" + game_id
    return getRequest(gameStatsQuery,true);
}
