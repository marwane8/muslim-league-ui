import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/home/panel'
import DropDown from "../components/drop-down"
import { TeamName } from '../utils/models'
import { getTeams } from '../utils/api/team-api'




export default function Teams({teams}: Props) {

  const borderStyle = 'border-b border-gray-100 '
  const teamColStyle = 'absolute  pl-2 py-1 text-left  pl-3 border-r-2 w-[120px] border-gray-100'
  const grayBG = 'bg-gray '
  const whiteBG = 'bg-white '
 
  const ateams = [
    {
      player: "Mike",
      number: 8,
      pos: "C"
    },
    {
      player: "Abdullah",
      number: 8,
      pos: "PG"
    },
    {
      player: "Mohammed",
      number: 24,
      pos: "SG"
    },
    {
      player: "Salah",
      number: 7,
      pos: "PF"
    },
    {
      player: "AJ",
      number: 1,
      pos: "SF"
    }
  ]
 
 return (
  <>
    <Header title='Teams | Muslim League CT'/>
    <Container>
    <Panel title='Teams'>
    <div className='my-5  max-w-lg m-auto'>
      <DropDown title='TEAMS' options={teams}/>
    </div>
    <h1 className='mt-7 text-center text-4xl font-bold'> Akastuski </h1>
    <div className='flex justify-between max-w-lg my-5 mx-auto'>
      <div className='w-20'>
        <div className=' flex justify-center items-center bg-primary h-20  text-center m-auto rounded-3xl'>  
          <div className='text-white text-3xl font-bold'> 1st </div>
        </div>
        <h1 className='pt-1 font-bold text-center'> OVR </h1>
      </div>

      <div className='w-20'>
        <div className=' flex justify-center items-center bg-primary h-20  text-center m-auto rounded-3xl'>  
          <div className='text-white text-3xl font-bold'> 1st </div>
        </div>
        <h1 className='pt-1 font-bold text-center'> PPG </h1>
      </div>

      <div className='w-20'>
        <div className=' flex justify-center items-center bg-primary h-20  text-center m-auto rounded-3xl'>  
          <div className='text-white text-3xl font-bold'> 1st </div>
        </div>
        <h1 className='pt-1 font-bold text-center'> RPG </h1>
      </div>
    </div>
      <div className='max-w-lg m-auto mb-6'>


      <h2 className='font-bold text-xl mb-2 mt-7 text-gray-300'> Player Stats </h2>

      <table className="w-full text-left">
        <thead className='text-gray-300 border-gray-100 border-t-2 border-b-2'>
          <tr >

                <td className='absolute  pl-3 border-r-2 w-[120px] bg-white text-gray-300 font-bold text-left border-gray-100'> Name </td>
                <th className= 'px-3 w-[130px]'>   </th>
                <th className='min-w-[30px]'>#</th>
                <th className='min-w-[30px]'> POS </th>
                <th className='min-w-[30px]'> AGE </th>
          </tr>
        </thead>
        <tbody>
          { ateams.map((team,index) => (
            <tr key={index} className={ index%2 ? borderStyle + grayBG : borderStyle + whiteBG } > 
              <td className={ index%2 ? teamColStyle : whiteBG + teamColStyle }> {team.player} </td>
              <th className= 'mr-5 w-[130px]'>   </th>
              <td className='py-1'> {team.pos} </td>
              <td className=''> {team.number} </td>
              <td className='pr-4'> - - </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
    </Panel>
    </Container>
  </>

 )
}

type Props = {
  teams: {key: number, value: string}[] 
}


export async function getServerSideProps() {
 
  const makeTeamOptions = (team: TeamName) => {
    let team_option = {
      key: team.id,
      value: team.name 
    }
    return team_option
  }

  

  let teams =  [
    {
      id: 1,
      name: "Team 1",
    },
    {
      id: 2,
      name: "Team 2",
    }
  ]

  try {
    teams = await getTeams(3)

  } catch (e) {
    console.error('Unable to get data')
  }
  let team_options = teams.map((team) => makeTeamOptions(team))
  return { props: {teams: team_options}}

}
