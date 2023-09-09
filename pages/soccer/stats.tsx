import React, { useState } from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { Sport, getSeasons, getStatLeaders } from "../../utils/api/league-api"
import { PlayerTotals } from "../../utils/soccer-types"
import { Season, makeSeasonOptions, PlayerStat } from "../../utils/league-types"

type Props = {
  season_options: {key: number, value: string}[],
  default_season: number,
  goalStats: PlayerStat[]
  assistsStats: PlayerStat[]
}

const GOAL_STAT = 1;
const ASSIST_STAT = 2;

const makeSoccerStat = (player_stat: PlayerTotals, stat_num: number) => {
    let stat = {
        id: player_stat.player_id,
        name: player_stat.player_name,
        stat: 0 
    }
    switch(stat_num) {
      case 1:
        stat.stat = player_stat.goals;
        break;
      case 2:
        stat.stat = player_stat.assists;
        break;
    }
    return stat 
}




export default function Standings({season_options, default_season, goalStats,assistsStats}: Props) {

  const [currSeason,setSeason] = useState<number>(default_season);
  const [currGoalStats,setGoalStats] = useState<any>(goalStats);
  const [currAssistStats,setAssistStats] = useState<any>(assistsStats);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    setSeason(new_season_id);

    let goals = await getStatLeaders(Sport.SOCCER, new_season_id,'goals',true) 
    let assists  = await getStatLeaders(Sport.SOCCER, new_season_id,'assists',true) 

    const goalStats = goals.map((player) =>makeSoccerStat(player,GOAL_STAT))
    const assistsStats = assists.map((player) =>makeSoccerStat(player,ASSIST_STAT))

    setGoalStats(goalStats);
    setAssistStats(assistsStats);
  }

  return(
    <Container>
    <Header title='Stats | Muslim League CT'/> 

    <Panel title="Stat Leaders" >
      <DropDown 
        title="SEASON"
        options={season_options}
        currentOption={currSeason}
        changeOption={handleSeasonChange}
      />
    </Panel>

    <Panel title="League Leaders" removeBorder={true}>

      <div className="sm:grid mb-3 grid-cols-2 gap-6">
        <StatTable 
        title="Goal Leaders"
        players={currGoalStats}
        stat="GOALS"
        />

      <StatTable 
        title="Assist Leaders"
        players={currAssistStats}
        stat="ASSISTS"
        />
      </div>

    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let seasons: Season[]=[]
  let default_season: number = 0

  let goalLeaders: PlayerTotals[] = []
  let assistsLeaders: PlayerTotals[] = []

  let goalStats:{id: number, name:  string, stat: number }[] = []
  let assistsStats:{id: number, name:  string, stat: number }[] = []
  
  try {
    seasons = await getSeasons(Sport.SOCCER);
    default_season = seasons.slice(-1)[0].season_id;

    goalLeaders = await getStatLeaders(Sport.SOCCER, default_season,'goals') 
    assistsLeaders = await getStatLeaders(Sport.SOCCER, default_season,'assists') 

    goalStats = goalLeaders.map((player) =>makeSoccerStat(player,GOAL_STAT))
    assistsStats = assistsLeaders.map((player) =>makeSoccerStat(player,ASSIST_STAT))

  } catch (e) {
    console.error('Unable to get data')
  }

  let season_options = seasons.map((season) => makeSeasonOptions(season))
  return { props: {season_options, default_season, goalStats, assistsStats}}
}
