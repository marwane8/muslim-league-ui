
import Header from '../components/header'
import Container from '../components/container'


const TeamTable = () => {
  
  const team = [
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
  
  return(
    <div className='max-w-lg m-auto overflow-hidden shadow-sm my-7 rounded-xl'>
      <table className="w-full text-left table-fixed">
        <thead className='text-white '>
          <tr>
            <th colSpan={3} className="py-3 text-xl text-center bg-primary"> Team </th>
          </tr>
          <tr  className='text-center bg-primary-100 text-primary-500'>
            <th className= 'w-40 px-6 py-3 border border-white'> Name </th>
            <th className='px-3 py-3 border border-white'> No. </th>
            <th className='px-3 py-3 border border-white'> Pos </th>
          </tr>
        </thead>
        <tbody>
          { team.map((team,index) => (
            <tr key={index} className={index%2 ? "bg-white hover:text-primary hover:font-bold " : "bg-gray hover:text-primary hover:font-bold "} > 
              <td className='px-3 py-4'> {team.player} </td>
              <td className='px-3 py-4'> {team.number}  </td>
              <td className='px-3 py-4'> {team.pos} </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  )
}



const Teams = () => {

    const teams = [
        {
            name: 'Top Akhs'
        },
        {
            name: 'Dub Nation'
        },
        {
            name: 'Akatsuki'
        },
        {
            name: 'Springfield'
        },
        {
            name: 'Mali World'
        },
        {
            name: 'Young Sahabs'
        },

    ]


  return (
      <Container>
        <Header title='Teams | Muslim League CT'/> 
        <h2 className='m-8 text-2xl font-bold text-center text-primary md:text-4xl'> Teams </h2>
        <div className='flex flex-col flex-wrap justify-between max-w-sm m-auto h-36'>

            { teams.map((team,index) => (
              <button  key={index} className='px-3 py-1 m-2 font-bold text-white rounded-lg bg-primary'>
                {team.name} 
              </button>
          ))}

        </div>
        <TeamTable/>
      </Container>
  )
}

export default Teams 
