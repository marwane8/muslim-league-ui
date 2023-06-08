import { useRouter } from 'next/router';
import Container from '../../components/container';
import Header from '../../components/header';
import Panel from '../../components/panel';




export default function Admin() {

    const router = useRouter();


    const handleInsertGamesClick = async () => {
        const teamsLink = '/admin/insert-games';
        router.push(teamsLink);
    }

    return (
      <>
        <Header title='Admin | Muslim League CT'/>
        <Container>

            <h1 className='mt-5 py-5 text-4xl font-bold text-center grow  text-primary'>  League Admin </h1>
            <Panel 
                title='Summer 2022 - Basketball'
                titleSize='medium'>

            <div className='m-auto grid grid-cols-2 max-w-3xl  gap-4 my-7'>
                <div className='h-24'> 
                    <button className='font-bold text-2xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Edit 2022 Rosters
                    </button>
                </div>
                <div className='h-24'> 
                    <button className='font-bold text-2xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Edit 2022 Schedule 
                    </button>
                </div>

                <div className='h-24 col-span-2'>
                    <button className={`font-bold text-3xl rounded-xl  text-white w-full h-full bg-primary hover:bg-primary-100`}
                                onClick={handleInsertGamesClick}>
                        Insert Game Data 
                    </button>
                </div>
            </div> 
            </Panel>
            <Panel 
                title='Season Management'
                titleSize='medium'>

            <div className='m-auto grid grid-rows-2 max-w-3xl  gap-4 my-7'>
                <div className='h-24'> 
                    <button className='font-bold text-2xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Create a New Season 
                    </button>
                </div>
                <div className='h-24'>
                    <button className='font-bold text-2xl rounded-xl text-gray-200 w-full h-full bg-gray-100 cursor-default' >
                        Select Season 
                    </button>
                </div>
            </div> 
            </Panel>

        </Container>
      </>
    );
}