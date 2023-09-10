import React, { useState } from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { Sport, Season, makeSeasonOptions, PlayerStat } from "../../utils/league-types"
import { SoccerStat } from "../../utils/soccer-types"
import {  getSeasons, getStatLeaders } from "../../utils/api/league-api"


type Props = {
  season_options: {key: number, value: string}[],
  default_season: number,
  goal_stats: PlayerStat[]
  assists_stats: PlayerStat[]
}


export default function Stats({season_options, default_season, goal_stats,assists_stats}: Props) {

  const [currSeason,setSeason] = useState<number>(default_season);
  const [currGoalStats,setGoalStats] = useState<PlayerStat[]>(goal_stats);
  const [currAssistStats,setAssistStats] = useState<PlayerStat[]>(assists_stats);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    setSeason(new_season_id);

    let goals = await getStatLeaders(Sport.SOCCER, new_season_id, SoccerStat.GOALS, true);
    let assists  = await getStatLeaders(Sport.SOCCER, new_season_id, SoccerStat.ASSISTS, true);

    setGoalStats(goals);
    setAssistStats(assists);
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

  let goal_stats: PlayerStat[] = []
  let assists_stats: PlayerStat[] = []

 
  try {
    seasons = await getSeasons(Sport.SOCCER);
    default_season = seasons.slice(-1)[0].season_id;

    goal_stats = await getStatLeaders(Sport.SOCCER, default_season,SoccerStat.GOALS) 
    assists_stats = await getStatLeaders(Sport.SOCCER, default_season,SoccerStat.ASSISTS) 
  } catch (e) {
    console.error('Unable to get data')
  }

  let season_options = seasons.map((season) => makeSeasonOptions(season))
  return { props: {season_options, default_season, goal_stats, assists_stats}}
}
