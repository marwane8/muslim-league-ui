import React from "react"
import Container from "../components/container"
import DropDown from "../components/widgets/drop-down"
import StatTable from "../components/tables/stat-table"

import Header from '../components/header'
import Panel from '../components/panel'

import { getStatLeaders } from "../utils/api/team-api"
import { PlayerStat } from "../utils/models"


type Props = {
  scoringList: PlayerStat[],
  reboundList: PlayerStat[]
}


export default function Standings({scoringList,reboundList}: Props) {

  return(
    <Container>
    <Header title='Stats | Muslim League CT'/> 

    <Panel title="Stat Leaders" >
      <DropDown 
        title="SEASON"
        options={[{key: 1, value: 'SUMMER 2022'}]}
        curentOption={1}
      />
    </Panel>

    <Panel title="2022 Summer League Leaders" removeBorder={true}>

      <div className="sm:grid mb-3 grid-cols-2 gap-6">
        <StatTable 
        title="Scoring Leaders"
        players={scoringList}
        stat="PTS"
        />

      <StatTable 
        title="Rebounding Leader"
        players={reboundList}
        stat="REB"
        />
      </div>

    </Panel >
  </Container>
  )
}

export async function getServerSideProps() {

  let pointsLeaders:PlayerStat[] = []
  let reboundLeaders:PlayerStat[] = []
  
  try {
    reboundLeaders = await getStatLeaders('rebounds') 
    pointsLeaders = await getStatLeaders('points') 
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {scoringList:pointsLeaders, reboundList:reboundLeaders}}
}
