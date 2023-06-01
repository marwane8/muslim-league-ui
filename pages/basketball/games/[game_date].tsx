import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Header from '../../../components/header'
import Container from '../../../components/container'

import GameDatesMenu from '../../../components/widgets/game-dates-menu'
import GameCard from '../../../components/widgets/game-card'

import { Game, GameDates, Team } from '../../../utils/models'
import { getGameDates, getGameForDate, getStandings } from '../../../utils/api/team-api'


type Props = {
  gameDates: GameDates,
  standings: Team[],
  games: Game[]
}

const Games = ({gameDates,standings,games}: Props) => {
  const router = useRouter()
  const { date } = router.query
  const [currGameDay,setGameDay] = useState<number>(Number(date));

  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameDatesMenu pageLength={4} currentGame={currGameDay} changeGame={setGameDay} gameDatesArray={gameDates.games}/>
        {
          games.map((game,index) => (
            <GameCard key={index} gameData={game} standings={standings}/>
        ))}
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { game_date } = context.query
    let gameDates: GameDates | null = null
    let standings: Team[] = []
    let games: Game[] = []
    try {
      gameDates = await getGameDates()
      standings=  await getStandings(3)
      if (typeof game_date === 'string'){
        let date = parseInt(game_date)
        games = await getGameForDate(date)
      }
    } catch (e) {
      console.error('Unable to get data')
    }

    return { props: {standings, gameDates, games }}

}

export default Games 
