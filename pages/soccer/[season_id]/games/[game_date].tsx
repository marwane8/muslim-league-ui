import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import SoccerGameCard from '../../../../components/widgets/soccer-game-card'

import { Season, makeSeasonOptions } from '../../../../utils/league-types'
import { Game, GameDates, Team } from '../../../../utils/soccer-types'
import { getSeasons } from '../../../../utils/api/apis'
import { getGameDates, getGameForDate, getStandings } from '../../../../utils/api/soccer-api'

import { formatNowToYYYYMMDD,getClosestDate } from '../../../../utils/utils'

type Props = {
  season: number,
  season_options: {key: number, value: string}[],
  standings: Team[],
  gameDates: GameDates,
  games: Game[]
  default_game: number
}


const Games = ({season, season_options, standings, gameDates, games,default_game}: Props) => {

  const router = useRouter()

  const [currGameDay,setGameDay] = useState<number>(default_game);
  
  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;

    const today = formatNowToYYYYMMDD()
    const gamesLink = '/soccer/' + new_season_id + '/games/' + today;
    router.push(gamesLink);


  }



  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameDatesMenu 
          pageLength={4} 
          pageLink='/soccer'
          seasonsArray={season_options}
          currentSeason={season}
          changeSeason={handleSeasonChange}
          currentGame={currGameDay} 
          changeGame={setGameDay} 
          gameDatesArray={gameDates.games}
          />
        {
          games.map((game,index) => (
            <SoccerGameCard key={index} gameData={game} standings={standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { season_id,game_date } = context.query

    let seasons: Season[]=[]
    let season: number = 0
    let default_game: number = 0;

    if (typeof season_id === 'string') {
      season = parseInt(season_id);
    } else {
      console.log('Unable to parse season id');
    }
    
    

    let gameDates: GameDates | null = { "games":[]}
    let standings: Team[] = []
    let games: Game[] = []

    
    try {
      seasons = await getSeasons('soccer');

      gameDates = await getGameDates(season)
      standings = await getStandings(season)

      if (typeof game_date === 'string'){
        let date = parseInt(game_date)
        default_game = getClosestDate(date,gameDates.games);
        games = await getGameForDate(default_game)

      }
    } catch (e) {
      console.error('Fetch Error: ', e)
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season))
    return { props: {season, season_options,  standings, gameDates, games, default_game }}

}

export default Games 
