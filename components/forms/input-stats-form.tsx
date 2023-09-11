import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import { Game, PlayerGameStats } from "../../utils/league-types"
import { formatDate, getSportCols } from "../../utils/utils"
import Modal from "../modal"
import InputStatsTable from "./input-stats-table"

import { Sport, Player, GameStats } from "../../utils/league-types"

import { insertGamesForSeason, getRoster, getPlayerGameStats } from "../../utils/api/league-api"




type PlayerStat = {
  player_id: number,
  player_name: string,
  [key: string]: number | string
}

type StatProps = {
  sport: Sport,
  game: Game,
  showTable: boolean,
  setShowTable: (showTable: boolean) => void
}

const InputStatsForm: NextPage<StatProps> = ({sport, game, showTable, setShowTable}: StatProps) => {

  const [team1StatData, setTeam1StatData] = useState<PlayerGameStats[]>([]);
  const [team2StatData, setTeam2StatData] = useState<PlayerGameStats[]>([]);
  const stat_col = getSportCols(sport);

  useEffect(() => {
    initTeamStatData(sport,game.game_id, game.team1_id,stat_col)
      .then((team1Data: PlayerGameStats[]) => {
        setTeam1StatData(team1Data);
      })
    initTeamStatData(sport,game.game_id, game.team2_id,stat_col)
      .then((team2Data: PlayerGameStats[]) => {
        setTeam2StatData(team2Data);
      })
  },[game]);

  const initTeamStatData = async (sport: Sport,game_id: number, team_id: number, stat_col: string[]) => {
    let initPlayerStats: PlayerGameStats[] = []
    try {
      const players: Player[] = await getRoster(sport,team_id,true);
      const teamStatData: PlayerGameStats[] = mapRosterToPlayerGameStats(game_id, players, stat_col);
      initPlayerStats = teamStatData;
    } catch (e) {
      console.error('Error Fetching Team Data: ', e)
    }
    return initPlayerStats;
  }

  function mapRosterToPlayerGameStats(game_id: number, roster: Player[], stat_col: string[]): PlayerGameStats[] {
    let playerStatList: PlayerGameStats[] = [];
    console.log("ROSTER", roster);
    roster.forEach((player) => {
      let playerStat: PlayerGameStats = {
        game_id: game_id,
        team_id: player.team_id,
        team_name: player.team_name,
        player_id: player.player_id,
        player_name: player.name,
        dnp: 1
      }

      stat_col.forEach((stat) => {
        playerStat[stat] = 0;
      
      })

      playerStatList.push(playerStat);
    })
    return(playerStatList);
  };

  const handleTeam1ValueChange = (index: number, prop: string, value: number) => {
    const updatedPlayers = [...team1StatData];
    updatedPlayers[index][prop] = value;
    setTeam1StatData(updatedPlayers);
  };

  const handleTeam2ValueChange = (index: number, prop: string, value: number) => {
    const updatedPlayers = [...team2StatData];
    updatedPlayers[index][prop] = value;
    setTeam2StatData(updatedPlayers);
  };


  const handleGameSubmit = async () => {
    const gameStats = createGameStats(game.game_id,[team1StatData,team2StatData]);
    const insertGamesResponse = await insertGamesForSeason(sport, gameStats,true);

    if (insertGamesResponse) {
      window.alert(JSON.stringify(insertGamesResponse.message));
      setShowTable(false);
    }

  };
 
  function createGameStats(gameId: number, teamStatData: PlayerStat[][]) {

        const gameStatList: GameStats[] = [];
        teamStatData.forEach((teamStats) => {
          teamStats.forEach((playerStats) => {
            const gameStat: GameStats = {
              game_id: gameId,
              player_id: playerStats.player_id

            }
            stats.forEach((stat) => {
              gameStat[stat] = playerStats[stat];
            });

            gameStatList.push(gameStat);
          });

      });

      return gameStatList;
  }

  return (
      <Modal isVisible={showTable}
              onClose={() => setShowTable(false)}>
          <div className='bg-white container max-w-screen-sm rounded-xl'>

                <h1 className='font-bold text-2xl text-center text-primary mt-3'> Insert Game Stats  </h1>
                <h1 className='text-lg text-center' >  {game.team1}  vs {game.team2} - { formatDate(game.date) } </h1>
                  <InputStatsTable
                      teamName={game.team1}
                      playerStatsData={team1StatData} 
                      rowHeaders={stat_col}
                      handleValueChange={handleTeam1ValueChange}
                  />    
                  <InputStatsTable
                      teamName={game.team2}
                      playerStatsData={team2StatData} 
                      rowHeaders={stat_col}
                      handleValueChange={handleTeam2ValueChange}
                  />    

                  <div>

                  </div>
                  <div className="flex my-5">
                    <button className='m-auto bg-primary py-1 px-3 font-bold text-white rounded-md hover:bg-primary-100'
                            onClick={handleGameSubmit}> 
                            Submit 
                    </button>
                  </div>
          </div>
      </Modal>
  )
}

export default InputStatsForm 