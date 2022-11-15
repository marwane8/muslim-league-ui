import Header from '../components/header'
import Container from '../components/container'

const Policy = () => {
  return (

      <Container>
      <Header title='Policy | Muslim League CT'/> 
        <div>

          <h2 className='m-8 text-2xl font-bold text-center text-primary md:text-4xl'> League Policy </h2>
          <div className='p-5 m-5 text-center rounded-xl bg-gray'>

              <p> The following policy and rules are implemented for team registration and all offical games. </p>
              
              <div className='flex justify-between w-40 py-1 m-auto'>
                <button className="px-2 py-1 bg-black rounded-md">
                    <a className="font-bold text-white"> Policy </a>
                </button>
                <button className="px-2 py-1 bg-black rounded-md">
                    <a className="font-bold text-white"> Rules </a>
                </button>
              </div>
        </div>
        </div>
      </Container>
  );
}

export default Policy 
