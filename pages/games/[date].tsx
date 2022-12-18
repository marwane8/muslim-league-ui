import Header from '../../components/header'
import Container from '../../components/container'

import GameMenu from '../../components/widgets/game-menu'
import GameCard from '../../components/widgets/game-card'
import { getGameDates, getGameForDate, getStandings } from '../../utils/api/team-api'
import { Game, GameDates, TeamData } from '../../utils/models'
import { useState } from 'react'
import { useRouter } from 'next/router'


type Props = {
  gamesDates: GameDates,
  standings: TeamData[],
  games: Game[]
}

const gameDay = [
  {
    team1: 'Top Akhs',
    record1: '6 - 2',
    score1: 98,
    team2: 'Rockets',
    record2: '8 - 0',
    score2: 102
  },
  {
    team1: 'Islam Dunk',
    record1: '5 - 3',
    score1: 76,
    team2: 'The Akatsuki',
    record2: '3 - 5',
    score2: 88 
  }
]

const Games = ({gamesDates,standings,games}: Props) => {
  const router = useRouter()
  const { date } = router.query
  const [currGameDay,setGameDay] = useState<number>(Number(date));

  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
        <GameMenu pageLength={4} currentGame={currGameDay} changeGame={setGameDay} games={gamesDates.games}/>
        {
          games.map((game,index) => (
            <GameCard key={index} gameID={1} gameData={game} standings={standings}/>
        ))}
      </Container>
  )
}

export async function getServerSideProps(context) {
    const { date } = context.query
    let game_dates: GameDates | null = null
    let standings_data: TeamData[] = []
    let games: Game[] = []
    try {
      game_dates = await getGameDates()
      standings_data =  await getStandings(3)
      games = await getGameForDate(date)
    } catch (e) {
      console.error('Unable to get data')
    }
    console.log(games)

    return { props: {standings: standings_data, gamesDates: game_dates, games: games}}

}

export default Games 
