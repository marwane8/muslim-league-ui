import championpic from '/public/champions.jpg' 

import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/panel'
import ImageCard from '../components/widgets/image-card'
import FancyButton from '../components/widgets/fancy-button'
import MiniStandings from '../components/tables/mini-standings'

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
         <h1 className='my-1 ml-2 text-4xl font-extrabold text-white md:text-7xl'>The Muslim League</h1>
          <p className='mt-1 ml-2 font-bold text-white text-l md:text-xl'>Uniting muslim athletes across CT.</p>
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
              Top Akhs defeat The Springfield Rockets in a close battle to 
              defend their title as back to back Muslim League champions.
            </p>
            </ImageCard>
          </div>

          <div className='max-w-5xl m-auto md:grid md:grid-cols-2'> 
            <div className='row-span-2'>
              <MiniStandings
                title='2022 Standings'
                standings={standings}
              />
            </div>
            <FancyButton 
              title='OUR LEAGUE LEADERS'
              button='LEADERS'
              link='/stats'
              tailWindImage='bg-award_img'
            />
            <FancyButton 
              title='2022 RANKINGS'
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
              Come back for updates and visit our social media for the latest content.
            </span>
          </p>
        </Panel> 

      </Container>
   </>
  )
}

export async function getServerSideProps() {

  let standings_data: TeamData[] = []

  try {
    standings_data = await getStandings(3)
  } catch (e) {
    console.error('Unable to get data')
  }
  return { props: {standings: standings_data}}
}



export default Home
