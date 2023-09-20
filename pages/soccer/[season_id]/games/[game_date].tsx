import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import SoccerGameCard from '../../../../components/widgets/soccer-game-card'

import { formatNowToYYYYMMDD,getNextGameDate } from '../../../../utils/utils'

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
  init_game_index: number,
  games: Game[]
}


const Games = ({ season_options, init_season_id, season_standings, game_dates, init_game_date, init_game_index, games}: Props) => {

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
          startIndex={init_game_index}
          seasonsOptions={season_options}
          currentSeason={init_season_id}
          changeSeason={handleSeasonChange}
          currentDate={currGameDay} 
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
    let init_game_index: number = 0;

    let season_standings: SoccerTeamData[] = []
    let game_dates: number[] = [];
    let games: Game[] = [];

    
    try {
      seasons = await getSeasons(Sport.SOCCER);
      season_standings = await getStandings(init_season_id);

      game_dates = await getGameDates(Sport.SOCCER, init_season_id);
      let nextGameDate = getNextGameDate(init_game_date,game_dates);


      init_game_index = Math.floor(nextGameDate.index/4) * 4 ;

      init_game_date = nextGameDate.date; 


      games = await getGamesForDate(Sport.SOCCER,init_game_date);

    } catch (e) {
      console.error('Fetch Error: ', e)
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season))
    return { props: {season_options, init_season_id, season_standings, game_dates, init_game_date, init_game_index, games}}

}

export default Games 
