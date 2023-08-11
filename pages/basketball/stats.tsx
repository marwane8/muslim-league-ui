import React, { useState } from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { getStatLeaders } from "../../utils/api/basketball-api"
import { PlayerStat } from "../../utils/bball-types"
import { Season, makeSeasonOptions } from "../../utils/league-types"
import { getSeasons } from "../../utils/api/apis"

type Props = {
  season_options: {key: number, value: string}[],
  default_season: number,
  default_points: PlayerStat[],
  default_rebounds: PlayerStat[]
}
const makeBasketballStat = (player_stat: PlayerStat, stat_num: number) => {
  let stat = {
      id: player_stat.id,
      name: player_stat.name,
      stat: player_stat.stat 
  }
  return stat 
}

export default function Stats(
    { season_options, default_season, default_points, default_rebounds }: Props) {

  const [currSeason,setSeason] = useState<number>(default_season);
  const [currPointsStat,setPointsStat] = useState(default_points);
  const [currReboundStat,setReboundStat] = useState(default_rebounds);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    setSeason(new_season_id);

    let points = await getStatLeaders(new_season_id,"points",true);
    let rebounds  = await getStatLeaders(new_season_id,"rebounds",true);

    setPointsStat(points);
    setReboundStat(rebounds);
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

    <Panel title="2022 Summer League Leaders" removeBorder={true}>

      <div className="sm:grid mb-3 grid-cols-2 gap-6">
        <StatTable 
        title="Scoring Leaders"
        players={currPointsStat}
        stat="PTS"
        />

        <StatTable 
        title="Rebounding Leaders"
        players={currReboundStat}
        stat="REB"
        />
      </div>

    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let seasons: Season[]=[]
  let default_season: number = 0
  let default_points: PlayerStat[] = []
  let default_rebounds: PlayerStat[] = []

  try {
    seasons = await getSeasons('bball');
    default_season = seasons.slice(-1)[0].season_id;
    default_points = await getStatLeaders(default_season,"points");
    default_rebounds = await getStatLeaders(default_season,"rebounds");
  } catch (e) {
    console.error('Unable to get stats data: ' + e);
  }


  let season_options = seasons.map((season) => makeSeasonOptions(season));
  return { props: { season_options, default_season, default_points, default_rebounds }}
}

