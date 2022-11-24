import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/panel'

const Policy = () => {

  return (
      <Container>
        <Header title='Policy | Muslim League CT'/> 
        <Panel title='League Policy'>
          <div className='m-5 text-center'>

              <p> The following policy and rules are implemented for team registration and all offical games. </p>
              
              <div className='flex justify-between w-36 py-3 m-auto'>
                <button className="px-2 py-1 bg-black rounded-md">
                    <a className="font-bold text-white"> Policy </a>
                </button>
                <button className="px-2 py-1 bg-black rounded-md">
                    <a className="font-bold text-white"> Rules </a>
                </button>
              </div>
          </div>

        </Panel>
      </Container>
  );
}

export default Policy 
