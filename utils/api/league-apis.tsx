import { Game } from "../league-types";
import { getRequest } from "./api-utils";

export async function getGamesForSeason(sport: string, season_id: number,useClient: boolean=false): Promise<Game[]> {
    const statLeadersQuery = "/api/v1/" + sport + "/games/season/" + season_id;
    return getRequest(statLeadersQuery,useClient);
}
