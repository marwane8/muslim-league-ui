import championpic from '/public/champions.jpg' 

import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/home/panel'
import ImageCard from '../components/home/image-card'
import FancyButton from '../components/home/fancy-button'

import { getStandings } from '../utils/api/team-api'
import { TeamData } from '../utils/models'

type Props = {
  standings: TeamData[]
} 

const Home = ({standings}: Props) => {
  return (
    <> 
      <Header /> 
      <div className='flex items-end bg-right bg-no-repeat lg:bg-right py-7 bg-[length:700px] sm:bg-cover bg-prayer_img h-[300px] sm:h-[600px]'>
        <Container>
         <h1 className='my-2 ml-2 text-4xl font-extrabold text-white md:text-7xl'>The Muslim League</h1>
          <p className='mt-3 ml-2 font-bold text-white text-l md:text-xl'>Uniting muslim athletes across CT.</p>
        </Container> 
      </div>

      <Container>
        <Panel title='2022 Season Recap'>
          <div className='flex justify-center'>
            <ImageCard 
              title='Top Akhs win 2022 Championship'
              src={championpic}
              alt='Picture of Championship Team'
              date='August 7th, 2022'>
            <p> 
              Top Akhs defeat The Springfield Rockets in close battle to 
              defend there tile and are now back to back Muslim League champions.
            </p>
            </ImageCard>
          </div>

          <div className='max-w-5xl m-auto md:grid md:grid-cols-2'> 
            <div className='row-span-2'>
              <MiniStats standings={standings}/>
            </div>
            <FancyButton 
              title='INDIVIDUAL WINNERS'
              button='AWARDS'
              link='/awards'
              tailWindImage='bg-award_img'
            />
            <FancyButton 
              title='OUR LEAGUE LEADERS'
              button='STANDINGS'
              link='/standings'
              tailWindImage='bg-scoring_img'
            />
          </div>
        </Panel>
        <Panel title='2023 Season Coming Soon'>
          <p className='text-l'> 
            Details for the 2023  Season will roll out early next year Inshallah.
            <span className='hidden pl-1 sm:inline'>
              Comeback for updates and visit our social media for the latest content.
            </span>
          </p>
        </Panel> 

      </Container>
   </>
  )
}

export async function getServerSideProps() {

  let standings_data =  [
    {
      id: 1,
      name: "Team 1",
      wins: 8,
      loss: 0
    },
    {
      id: 2,
      name: "Team 2",
      wins: 7,
      loss: 1
    },
    {
      id: 2,
      name: "Team 2",
      wins: 7,
      loss: 1
    }

  ]

  try {
    standings_data = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings: standings_data}}
}

const MiniStats = ({standings}: Props) => {
  
  return(
    <div className='m-3 overflow-hidden border-2 border-gray-300 rounded-xl'>
      <div className='py-2 text-lg font-bold text-center text-white border-b border-gray-300 bg-primary'> 2022 Standings </div>
      <div className='px-3'>
      <table className="w-full text-center table-fixed ">
        <thead className=''>
          <tr >
            <th className= 'w-2/3 px-1 py-2 text-left '>Team</th>
            <th className='px-1 py-2 '>W</th>
            <th className='px-1 py-2 '>L</th>
            <th className='px-1 py-2'>%</th>
          </tr>
        </thead>
        <tbody>
          { standings.map((teams,index) => (
            <tr key={index} className="border-t border-gray-300" > 
              <td className='px-1 py-2 text-left'><span className='font-bold'>{index+1}</span> {teams.name} </td>
              <td className='px-1 py-2'> {teams.wins}  </td>
              <td className='px-1 py-2'> {teams.loss} </td>
              <td className='px-1 py-2 text-sm'> {(teams.wins/(teams.wins+teams.loss))} </td>
            </tr>
         ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home
