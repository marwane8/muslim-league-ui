import { Player, PlayerStat, Team, TeamName, GameDates, Game, GameStat } from "../models";
import { getRequest } from "./api-utils";

export async function getStandings(season_id: number): Promise<Team[]> {
    const standingsQuery = "/api/v1/teams/" + season_id  + "/standings";
    return getRequest(standingsQuery);
}
export async function getTeams(season_id: number): Promise<TeamName[]> {
    const teamsQuery = "/api/v1/teams/" + season_id;
    return getRequest(teamsQuery);
}

export async function getRoster(team_id: number): Promise<Player[]> {
    const rosterQuery = "/api/v1/players/" + team_id;
    return getRequest(rosterQuery,true);
}

export async function getStatLeaders(stat: string): Promise<PlayerStat[]> {
    const statLeadersQuery = "/api/v1/players/0/stat/" + stat;
    return getRequest(statLeadersQuery);
}

export async function getGameDates(): Promise<GameDates> {
    const gameDatesQuery = "/api/v1/games/dates";
    return getRequest(gameDatesQuery);
}

export async function getGameForDate(date: number): Promise<Game[]> {
    const gamesForDateQuery = "/api/v1/games/" + date;
    return getRequest(gamesForDateQuery);
}

export async function getGameStats(game_id: number): Promise<GameStat[]> {
    const gameStatsQuery = "/api/v1/games/stats/" + game_id
    return getRequest(gameStatsQuery,true);
}
