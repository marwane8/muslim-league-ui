import Header from '../components/header'
import Container from '../components/container'

import GameMenu from '../components/widgets/game-menu'

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'

const Games = () => {
  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 

          <GameMenu/>

          <div className='bg-white max-w-lg my-5 rounded-md mx-auto overflow-hidden'> 
              <div className='flex justify-end h-32'>
                <div className='w-2/3 flex justify-end'>
                      <div className='flex flex-col w-1/2 justify-center text-center'>
                        <h3 className='font-bold'> Top Akhs </h3>
                        <h4 className='text-gray-200'> 6 - 2 </h4>
                      </div>
                      <div className='w-14 text-center my-auto mr-3 text-2xl font-extrabold'> 98  </div>
                </div>
                <div className='flex my-auto justify-between items-center w-36 text-center '>

                  <WinArrowLeft className='h-4'/> 
                   FINAL 

                  <WinArrowRight className='h-4'/> 
                </div>
                <div className='w-2/3 flex flex-row-reverse justify-end'>
                      <div className='flex flex-col justify-center w-1/2 text-center'>
                        <h3 className='font-bold'> Springfield Rockets</h3>
                        <h4 className='text-gray-200'> 8 - 0 </h4>
                      </div>
                      <div className='w-14 text-center my-auto ml-3 text-2xl font-extrabold'> 122  </div>
                </div>  
              </div>
            <div className='border-t py-1 text-center border-gray-100 my-auto text-gray-200'> BOX SCORE </div>
          </div>
      </Container>
  )
}

export default Games 
