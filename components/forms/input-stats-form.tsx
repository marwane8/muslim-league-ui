import React, { useEffect, useState } from "react"
import { NextPage } from "next"

import { Game, StatUpsert, PlayerGameStats, SportID } from "../../utils/league-types"
import { formatDate } from "../../utils/utils"
import Modal from "../modal"
import InputStatsTable from "./input-stats-table"

import { Player } from "../../utils/league-types"

import { insertGamesForSeason, getRoster, getPlayerGameStats, updateTeamStats } from "../../utils/api/league-api"


type StatProps = {
  sport: string,
  game: Game,
  showTable: boolean,
  setShowTable: (showTable: boolean) => void
}

const InputStatsForm: NextPage<StatProps> = ({sport, game, showTable, setShowTable}: StatProps) => {

  const [team1StatData, setTeam1StatData] = useState<PlayerGameStats[]>([]);
  const [team2StatData, setTeam2StatData] = useState<PlayerGameStats[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initTeamStatData(sport,game.game_id, game.team1_id)
      .then((team1Data: PlayerGameStats[]) => {
        setTeam1StatData(team1Data);
      })
    initTeamStatData(sport,game.game_id, game.team2_id)
      .then((team2Data: PlayerGameStats[]) => {
        setTeam2StatData(team2Data);
      })

  //useEffect should call ONLY on a new game state
  },[game]);

  // -- FORM INITIALIZATION --
  const initTeamStatData = async (sport: string,game_id: number, team_id: number) => {
    let initPlayerStats: PlayerGameStats[] = []
    try {
      const players: Player[] = await getRoster(team_id,true);
      const currGameData: PlayerGameStats[] = await getPlayerGameStats(game.game_id, true);
      let teamStatData: PlayerGameStats[] = mapRosterToPlayerGameStats(sport, game_id, players);
      fillTeamGameData(teamStatData, currGameData);
      initPlayerStats = teamStatData;
    } catch (e) {
      console.error('Error Fetching Team Data: ', e)
    }
    return initPlayerStats;
  }

  function mapRosterToPlayerGameStats(sport: string, game_id: number, roster: Player[]): PlayerGameStats[] {
    let playerStatList: PlayerGameStats[] = [];

    roster.forEach((player) => {

      let playerStat: PlayerGameStats = {
        game_id: game_id,
        team_id: player.team_id,
        team_name: player.team_name,
        //@ts-ignore
        player_id: player.player_id,
        player_name: player.name,
        dnp: 1, 
        stat1: 0,
        stat2: 0,
        stat3: 0
      }

      switch(sport) {
        case "basketball":
          playerStat.type1 = "points";
          playerStat.type2 = "rebounds";
          playerStat.type3 = "fouls";
          break;
        case "soccer":
          playerStat.type1 = "goals";
          playerStat.type2 = "assists";
          playerStat.type3 = "NA";
          break;

      }
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
        team_data[i].stat1 = p_stat.stat1;
        team_data[i].stat2 = p_stat.stat2;
        team_data[i].stat3 = p_stat.stat3;
      }
    }
  };


  // -- FORM VALUE CHANGING --
  const handleTeam1ValueChange = (index: number, prop: string, value: number) => {
    let updatedPlayers = [...team1StatData];
    //@ts-ignore
    updatedPlayers[index][prop] = value;
    if (prop=='dnp' && value==1){
      updatedPlayers[index].stat1 = 0;
      updatedPlayers[index].stat2 = 0;
      updatedPlayers[index].stat3 = 0;
    }
    setTeam1StatData(updatedPlayers);
  };

  const handleTeam2ValueChange = (index: number, prop: string, value: number) => {
    let updatedPlayers = [...team2StatData];
    //@ts-ignore
    updatedPlayers[index][prop] = value;

    if (prop=='dnp' && value==1){
      updatedPlayers[index].stat1 = 0;
      updatedPlayers[index].stat2 = 0;
      updatedPlayers[index].stat3 = 0;
    }
    setTeam2StatData(updatedPlayers);
  };


  // -- FORM SUBMISSION --
  const handleGameSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let ans = confirm("Are you ready to submit?");
    if (ans === true) {
      setLoading(true);
      const insertStats = createInsertStats(sport, [team1StatData,team2StatData]);
      const teamIDList = [game.team1_id,game.team2_id]
      try {
        const insertGamesResponse = await insertGamesForSeason(insertStats,true);
        await updateTeamStats(teamIDList,true);
        if (insertGamesResponse) {
          window.alert(JSON.stringify(insertGamesResponse.message));
          setShowTable(false);
        }

      } catch (e) {
        window.alert(e);
      }
      setLoading(false);
      
    }

    
  };
 
  function createInsertStats(sport: string, teamStatData: PlayerGameStats[][]): StatUpsert[] {
      const gameStatList: StatUpsert[] = [];

      const curr_sport_id = SportID[sport];

      for(let i = 0 ; i < 2; i ++) {
        teamStatData[i].forEach((gstat) => {
          let gameStat: StatUpsert = {
            sport_id: curr_sport_id,
            game_id: gstat.game_id,
            player_id: gstat.player_id,
            dnp: gstat.dnp,
            stat1_type: gstat.type1,
            stat1: gstat.stat1,
            stat2_type: gstat.type2,
            stat2: gstat.stat2,
            stat3_type: gstat.type3,
            stat3: gstat.stat3
          }; 

          if (gstat.stat_id) {
            gameStat.id = gstat.stat_id
          }
          gameStatList.push(gameStat);
        });
      }

      return gameStatList;
  }

  return (
      <Modal isVisible={showTable}
              onClose={() => setShowTable(false)}>
          <div className='container max-w-screen-sm bg-gray-100 rounded-xl'>

                <h1 className='mt-3 text-2xl font-bold text-center text-primary'> Insert Game Stats  </h1>
                <h1 className='text-xl text-center ' >  {game.team1}  vs {game.team2} </h1>
                <h1 className="text-center text-md"> { formatDate(game.date) }  </h1>
                  <div className="m-auto flex flex-col border-t-2 border-b-2 border-gray-200 bg-white  pt-5 mt-2  w-[600px] max-w-full overflow-y-scroll  max-h-[400px]">

                  <InputStatsTable
                      sport={sport}
                      teamName={game.team1}
                      gameStats={team1StatData} 
                      handleValueChange={handleTeam1ValueChange}
                  />    
                  <InputStatsTable
                      sport={sport}
                      teamName={game.team2}
                      gameStats={team2StatData} 
                      handleValueChange={handleTeam2ValueChange}
                  />    

                  </div>
                  <div>

                  </div>
                  <div className="flex justify-around w-1/2 m-auto my-3">
                    <button className='px-3 py-1 font-bold text-white rounded-md bg-secondary hover:bg-secondary-100'
                            onClick={() => setShowTable(false)}> 
                            Back 
                    </button>
                    <button className='px-3 py-1 font-bold text-white rounded-md disabled:bg-gray-200 disabled:text-gray-300 bg-primary hover:bg-primary-100'
                            onClick={(e) => handleGameSubmit(e)}
                            disabled={loading} 
                            > 
                            Submit 
                    </button>
                  </div>
          </div>
      </Modal>
  )
}

export default InputStatsForm 