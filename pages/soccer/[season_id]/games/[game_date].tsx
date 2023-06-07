import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import SoccerGameCard from '../../../../components/widgets/soccer-game-card'

import { Season, Game, GameDates, Team, makeSeasonOptions } from '../../../../utils/soccer-models'
import { getGameDates, getGameForDate, getSeasons, getStandings } from '../../../../utils/api/soccer-api'


type Props = {
  season: number,
  season_options: {key: number, value: string}[],
  standings: Team[],
  gameDates: GameDates,
  games: Game[]
}


const Games = ({season, season_options, standings, gameDates, games}: Props) => {

  const router = useRouter()
  const { date } = router.query

  const [currGameDay,setGameDay] = useState<number>(Number(date));
  
  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;

    const gamesLink = '/soccer/' + new_season_id + '/games/' + 20220610;
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

    if (typeof season_id === 'string') {
      season = parseInt(season_id);
    } else {
      console.log('Unable to parse season id');
    }
 

    let gameDates: GameDates | null = { "games":[]}
    let standings: Team[] = []
    let games: Game[] = []

    try {
      seasons = await getSeasons();

      gameDates = await getGameDates(season)
      standings = await getStandings(season)

      if (typeof game_date === 'string'){
        let date = parseInt(game_date)
        games = await getGameForDate(date)
      }
    } catch (e) {
      console.error('Unable to get data')
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season))
    return { props: {season, season_options,  standings, gameDates, games }}

}

export default Games 
