import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../components/header'
import Container from '../../../components/container'

import GameDatesMenu from '../../../components/widgets/game-dates-menu'
import SoccerGameCard from '../../../components/widgets/soccer-game-card'

import { Season, Game, GameDates, Team, makeSeasonOptions } from '../../../utils/soccer-models'
import { getGameDates, getGameForDate, getSeasons, getStandings } from '../../../utils/api/soccer-api'


type Props = {
  season_options: {key: number, value: string}[],
  default_season: number,
  default_gameDates: GameDates,
  default_standings: Team[],
  games: Game[]
}

const Games = ({season_options, default_season, default_gameDates,default_standings,games}: Props) => {

  const router = useRouter()
  const { date } = router.query

  const [currSeason,setSeason] = useState<number>(default_season);
  const [standings,setStandings] = useState<Team[]>(default_standings);

  const [gameDates,setGameDates] = useState<GameDates>(default_gameDates);
  const [currGameDay,setGameDay] = useState<number>(Number(date));
  
  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    setSeason(new_season_id);

    const newGameDates = await getGameDates(new_season_id);
    const newStandings = await getStandings(new_season_id);

    setGameDates(newGameDates);
    setStandings(newStandings);

  }



  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameDatesMenu 
          pageLength={4} 
          pageLink='/soccer'
          currentSeason={currSeason}
          changeSeason={handleSeasonChange}
          seasonsArray={season_options}
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
    const { game_date } = context.query

    let seasons: Season[]=[]
    let default_season: number = 0


    let default_gameDates: GameDates | null = { "games":[]}
    let default_standings: Team[] = []
    let games: Game[] = []

    try {

      seasons = await getSeasons();
      default_season = seasons.slice(-1)[0].season_id;

      default_gameDates = await getGameDates(default_season)
      default_standings = await getStandings(default_season)

      if (typeof game_date === 'string'){
        let date = parseInt(game_date)
        games = await getGameForDate(date)
      }
    } catch (e) {
      console.error('Unable to get data')
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season))
    return { props: {season_options, default_season, default_standings, default_gameDates, games }}

}

export default Games 
