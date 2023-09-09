import React, { useState } from "react"
import Container from "../../components/container"
import DropDown from "../../components/widgets/drop-down"
import StatTable from "../../components/tables/stat-table"

import Header from '../../components/header'
import Panel from '../../components/panel'

import { Sport, Season, makeSeasonOptions, PlayerStat } from "../../utils/league-types"
import { BBallStat } from "../../utils/basketball-types"

import { getSeasons, getStatLeaders } from "../../utils/api/league-api"

type Props = {
  season_options: {key: number, value: string}[],
  default_season: number,
  default_points: PlayerStat[],
  default_rebounds: PlayerStat[]
}


export default function Stats(
    { season_options, default_season, default_points, default_rebounds }: Props) {

  const [currSeason,setSeason] = useState<number>(default_season);
  const [currPointsStat,setPointsStat] = useState(default_points);
  const [currReboundStat,setReboundStat] = useState(default_rebounds);

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    setSeason(new_season_id);

    let points = await getStatLeaders(Sport.BASKETBALL, new_season_id, BBallStat.POINTS, true);
    let rebounds  = await getStatLeaders(Sport.BASKETBALL, new_season_id, BBallStat.REBOUNDS, true);

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

    <Panel title="League Leaders" removeBorder={true}>

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
    seasons = await getSeasons(Sport.BASKETBALL);
    default_season = seasons.slice(-1)[0].season_id;
    default_points = await getStatLeaders(Sport.BASKETBALL,default_season, BBallStat.POINTS);
    default_rebounds = await getStatLeaders(Sport.BASKETBALL,default_season, BBallStat.REBOUNDS);
  } catch (e) {
    console.error('Unable to get stats data: ' + e);
  }


  let season_options = seasons.map((season) => makeSeasonOptions(season));
  return { props: { season_options, default_season, default_points, default_rebounds }}
}

