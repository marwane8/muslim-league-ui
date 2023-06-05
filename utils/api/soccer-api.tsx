import { Team } from "../soccer-models";
import { getRequest } from "./api-utils";

export async function getStandings(season_id: number): Promise<Team[]> {
    const standingsQuery = "/api/v1/soccer/teams/" + season_id  + "/standings";
    return getRequest(standingsQuery);
}