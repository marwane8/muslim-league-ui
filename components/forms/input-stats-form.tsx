import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import { Game, PlayerGameStats } from "../../utils/league-types"
import { formatDate, getSportStats  } from "../../utils/utils"
import Modal from "../modal"
import InputStatsTable from "./input-stats-table"

import { Sport, Player, GameStats } from "../../utils/league-types"

import { insertGamesForSeason, getRoster, getPlayerGameStats } from "../../utils/api/league-api"
import { BBallStat } from "../../utils/basketball-types"





type StatProps = {
  sport: Sport,
  game: Game,
  showTable: boolean,
  setShowTable: (showTable: boolean) => void
}

const InputStatsForm: NextPage<StatProps> = ({sport, game, showTable, setShowTable}: StatProps) => {

  const [team1StatData, setTeam1StatData] = useState<PlayerGameStats[]>([]);
  const [team2StatData, setTeam2StatData] = useState<PlayerGameStats[]>([]);
  const sportStat = getSportStats(sport);
  const stat_col = Object.values(sportStat);

  //Make a useEffect call ONLY on a new game state
  useEffect(() => {
    initTeamStatData(sport,game.game_id, game.team1_id)
      .then((team1Data: PlayerGameStats[]) => {
        setTeam1StatData(team1Data);
      })
    initTeamStatData(sport,game.game_id, game.team2_id)
      .then((team2Data: PlayerGameStats[]) => {
        setTeam2StatData(team2Data);
      })
  },[game]);

  // -- FORM INITIALIZATION --
  const initTeamStatData = async (sport: Sport,game_id: number, team_id: number) => {
    let initPlayerStats: PlayerGameStats[] = []
    try {
      const players: Player[] = await getRoster(sport,team_id,true);
      const currGameData: PlayerGameStats[] = await getPlayerGameStats(sport, game.game_id, true);
      let teamStatData: PlayerGameStats[] = mapRosterToPlayerGameStats(game_id, players);
      fillTeamGameData(teamStatData, currGameData);
      initPlayerStats = teamStatData;
    } catch (e) {
      console.error('Error Fetching Team Data: ', e)
    }
    return initPlayerStats;
  }

  function mapRosterToPlayerGameStats(game_id: number, roster: Player[]): PlayerGameStats[] {
    let playerStatList: PlayerGameStats[] = [];
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


  function fillTeamGameData(team_data: PlayerGameStats[], game_data: PlayerGameStats[]): void{
    for(let i = 0; i < team_data.length; i++) {
      const playerID = team_data[i].player_id;
      let p_stat = game_data.find((player: PlayerGameStats) => player.player_id === playerID);
      if (p_stat) {
        team_data[i].stat_id = p_stat.stat_id;
        team_data[i].dnp = p_stat.dnp;

        stat_col.forEach((stat) => {
          if (p_stat && p_stat[stat]) {
            team_data[i][stat] = p_stat[stat];
          }
        })
      }
    }
  };


  // -- FORM VALUE CHANGING --
  const handleTeam1ValueChange = (index: number, prop: string, value: number) => {
    let updatedPlayers = [...team1StatData];
    updatedPlayers[index][prop] = value;
    if (prop=='dnp' && value==1){
      stat_col.forEach((stat) => {
        updatedPlayers[index][stat] = 0;
      })
    }
    setTeam1StatData(updatedPlayers);
  };

  const handleTeam2ValueChange = (index: number, prop: string, value: number) => {
    const updatedPlayers = [...team2StatData];
    updatedPlayers[index][prop] = value;
    if (prop=='dnp' && value==1){
      stat_col.forEach((stat) => {
        updatedPlayers[index][stat] = 0;
      })
    }
    setTeam2StatData(updatedPlayers);
  };


  // -- FORM SUBMISSION --
  const handleGameSubmit = async () => {
    const gameStats = createGameStats(game.game_id,[team1StatData,team2StatData]);
    const insertGamesResponse = await insertGamesForSeason(sport, gameStats,true);

    if (insertGamesResponse) {
      window.alert(JSON.stringify(insertGamesResponse.message));
      setShowTable(false);
    }

  };
 
  function createGameStats(gameId: number, teamStatData: PlayerGameStats[][]) {

        const gameStatList: GameStats[] = [];
        teamStatData.forEach((teamStats) => {
          teamStats.forEach((playerStats) => {
            const gameStat: GameStats = {
              game_id: gameId,
              player_id: playerStats.player_id

            }
            stat_col.forEach((stat) => {
                //gameStat[stat] = playerStats[stat];
            });

            gameStatList.push(gameStat);
          });

      });

      return gameStatList;
  }

  return (
      <Modal isVisible={showTable}
              onClose={() => setShowTable(false)}>
          <div className='bg-gray-100 container max-w-screen-sm rounded-xl'>

                <h1 className='font-bold text-2xl text-center text-primary mt-3'> Insert Game Stats  </h1>
                <h1 className='text-xl text-center ' >  {game.team1}  vs {game.team2} </h1>
                <h1 className="text-md text-center"> { formatDate(game.date) }  </h1>
                  <div className="m-auto flex flex-col border-t-2 border-b-2 border-gray-200 bg-white  pt-5 mt-2  w-[600px] max-w-full overflow-y-scroll  max-h-[400px]">

                  <InputStatsTable
                      sport={sport}
                      teamName={game.team1}
                      gameStats={team1StatData} 
                      rowHeaders={stat_col}
                      handleValueChange={handleTeam1ValueChange}
                  />    
                  <InputStatsTable
                      sport={sport}
                      teamName={game.team2}
                      gameStats={team2StatData} 
                      rowHeaders={stat_col}
                      handleValueChange={handleTeam2ValueChange}
                  />    

                  </div>
                  <div>

                  </div>
                  <div className="flex w-1/2 m-auto justify-around my-3">
                    <button className=' bg-secondary py-1 px-3 font-bold text-white rounded-md hover:bg-secondary-100'
                            onClick={() => setShowTable(false)}> 
                            Back 
                    </button>
                    <button className=' bg-primary py-1 px-3 font-bold text-white rounded-md hover:bg-primary-100'
                            onClick={handleGameSubmit}> 
                            Submit 
                    </button>
                  </div>
          </div>
      </Modal>
  )
}

export default InputStatsForm 