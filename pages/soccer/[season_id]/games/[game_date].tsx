import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import SoccerGameCard from '../../../../components/widgets/soccer-game-card'

import { formatNowToYYYYMMDD,getClosestDate } from '../../../../utils/utils'

import { Sport, Season, makeSeasonOptions, Game } from '../../../../utils/league-types'
import {  SoccerTeamData } from '../../../../utils/soccer-types'

import { getSeasons, getGameDates, getGamesForDate } from '../../../../utils/api/league-api'
import { getStandings } from '../../../../utils/api/soccer-api'


type Props = {
  season_options: {key: number, value: string}[],
  init_season_id: number,
  season_standings: SoccerTeamData[],
  game_dates: number[],
  init_game_date: number,
  games: Game[]
}


const Games = ({ season_options, init_season_id, season_standings, game_dates, init_game_date, games}: Props) => {

  const router = useRouter()

  const [currGameDay,setGameDay] = useState<number>(init_game_date);
  
  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;

    const today = formatNowToYYYYMMDD();
    const gamesLink = '/soccer/' + new_season_id + '/games/' + today;
    router.push(gamesLink);

  }



  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameDatesMenu 
          pageLength={4} 
          pageLink='/soccer'
          seasonsOptions={season_options}
          currentSeason={init_season_id}
          changeSeason={handleSeasonChange}
          currentGame={currGameDay} 
          changeGame={setGameDay} 
          gameDatesArray={game_dates}
          />
        {
          games.map((game,index) => (
            <SoccerGameCard key={index} gameData={game} standings={season_standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { season_id, game_date } = context.query

    let seasons: Season[]=[]
    let init_season_id: number = Number(season_id);
    let init_game_date: number = Number(game_date);

    let season_standings: SoccerTeamData[] = []
    let game_dates: number[] = [];
    let games: Game[] = [];

    
    try {
      seasons = await getSeasons(Sport.SOCCER);
      season_standings = await getStandings(init_season_id);

      game_dates = await getGameDates(Sport.SOCCER, init_season_id);
      init_game_date = getClosestDate(init_game_date,game_dates);

      games = await getGamesForDate(Sport.SOCCER,init_game_date);

    } catch (e) {
      console.error('Fetch Error: ', e)
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season))
    return { props: {season_options, init_season_id, season_standings, game_dates, init_game_date, games}}

}

export default Games 
