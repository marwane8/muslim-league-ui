import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import { Game } from "../../utils/league-types"
import { formatDate } from "../../utils/utils"
import Modal from "../modal"
import InputStatsTable from "./input-stats-table"
import { Player } from "../../utils/league-types"
import { getRoster } from "../../utils/api/soccer-api"
import { GameStat } from "../../utils/league-types"
import { insertGamesForSeason } from "../../utils/api/league-apis"



type PlayerStat = {
  player_id: number,
  player_name: string,
  [key: string]: number | string
}

type StatProps = {
  sport: string,
  game: Game,
  stats: string[], 
  showTable: boolean,
  setShowTable: (showTable: boolean) => void
}

const InputStatsForm: NextPage<StatProps> = ({sport, game,stats, showTable, setShowTable}: StatProps) => {

  const [team1StatData, setTeam1StatData] = useState<any>([]);
  const [team2StatData, setTeam2StatData] = useState<any>([]);

  useEffect(() => {

    const fetchPlayers = async () => {
      try {
        const team1Players: Player[] = await getRoster(game.team1_id,true);
        const team2Players: Player[] = await getRoster(game.team2_id,true);
        const statData1 = calculatePlayersStat(team1Players,stats);
        const statData2 = calculatePlayersStat(team2Players,stats);
        setTeam1StatData(statData1);
        setTeam2StatData(statData2);
      } catch (e) {
        console.error('Error fetching players', e);
      }
    
    }

    function calculatePlayersStat(players: Player[], stats: string[]): PlayerStat[] {
        const playersStatList: PlayerStat[] = [];
        players.forEach((player) => {
          const playerStat: PlayerStat = {
            player_id: player.player_id,
            player_name: player.player_name,
          };

          stats.forEach((stat) => {
            playerStat[stat] = 0;
          });

          playersStatList.push(playerStat);
      });

      return playersStatList;
    }
    fetchPlayers();

  },[game,stats])


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

        const gameStatList: GameStat[] = [];
        teamStatData.forEach((teamStats) => {
          teamStats.forEach((playerStats) => {
            const gameStat: GameStat = {
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
                      rowHeaders={stats}
                      handleValueChange={handleTeam1ValueChange}
                  />    
                  <InputStatsTable
                      teamName={game.team2}
                      playerStatsData={team2StatData} 
                      rowHeaders={stats}
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