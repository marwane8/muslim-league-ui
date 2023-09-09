import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../../components/header'
import Container from '../../../../components/container'

import GameDatesMenu from '../../../../components/widgets/game-dates-menu'
import GameCard from '../../../../components/widgets/basketball-game-card'

import { parseParamToInt, formatNowToYYYYMMDD, getClosestDate } from '../../../../utils/utils'

import { Game, Season, Sport, makeSeasonOptions } from '../../../../utils/league-types'
import { TeamData } from '../../../../utils/basketball-types'

import { getGameDates, getGamesForDate, getSeasons } from '../../../../utils/api/league-api'
import { getStandings } from '../../../../utils/api/basketball-api'


type Props = {
  season_options: {key: number, value: string}[],
  init_season_id: number,
  season_standings: TeamData[],
  game_dates: number[],
  games: Game[]
}

const Games = ({season_options, init_season_id, season_standings,game_dates,games}: Props) => {
  const router = useRouter()
  const { date } = router.query
  const [currGameDay,setGameDay] = useState<number>(Number(date));

  const handleSeasonChange = async (e: any) => {
    const new_season_id: number = e.target.value;
    const today = formatNowToYYYYMMDD();
    const gamesLink = '/basketball/' + new_season_id + '/games/' + today;
    router.push(gamesLink);
  }

    return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameDatesMenu 
          pageLength={4} 
          pageLink='/basketball'          
          seasonsOptions={season_options}
          changeSeason={handleSeasonChange}
          currentSeason={init_season_id}
          currentGame={currGameDay} 
          changeGame={setGameDay} 
          gameDatesArray={game_dates} 
          />

        {
          games.map((game,index) => (
            <GameCard key={index} gameData={game} standings={season_standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { season_id, game_date } = context.query

    let seasons: Season[] = [];
    let init_season_id: number = parseParamToInt(season_id);
    let init_game_date: number = parseParamToInt(game_date);

    let season_standings: TeamData[] = [];
    let game_dates: number[] = [];
    let games: Game[] = [];

    try {
      seasons = await getSeasons(Sport.BASKETBALL);
      season_standings=  await getStandings(init_season_id);

      game_dates = await getGameDates(Sport.BASKETBALL,init_season_id);
      init_game_date = getClosestDate(init_game_date,game_dates);

      games = await getGamesForDate(Sport.BASKETBALL,init_game_date);
      
    } catch (e) {
      console.error('Unable to get data: ', e);
    }

    let season_options = seasons.map((season) => makeSeasonOptions(season));
    return { props: {season_options, init_season_id, season_standings, game_dates, games }}

}

export default Games 
