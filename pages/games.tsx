import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/panel'

import LeftArrow from '/public/svgs/left.svg'
import RightArrow from '/public/svgs/right.svg'

import WinArrowRight from '/public/svgs/win-arrow-right.svg'
import WinArrowLeft from '/public/svgs/win-arrow-left.svg'

const Games = () => {
  return (
      <Container>
        <Header title='Games | Muslim League CT'/> 
          <Panel
            title='Muslim League CT Games'
            removeBorder={true}
            >
          <div className='bg-gray flex justify-between'> 
          <div className=' flex items-center h-12 bg-primary'>
            <LeftArrow className="h-6"/>
          </div>
            <div className='flex flex-col text-center bg-red w-20 my-auto'>
               <h3 className='text-sm hover:font-bold'>MON</h3>
               <h4 className='text-xs'> NOV 24</h4>
            </div> 

          <div className='flex items-center h-12 bg-primary'>
            <RightArrow className="h-6"/>
          </div>
          </div>
          </Panel>

          <div className='bg-white max-w-lg my-5 rounded-md mx-auto overflow-hidden'> 
              <div className='flex justify-between h-32'>
                <div className='w-2/3 flex justify-end'>
                      <div className='flex flex-col justify-center text-center'>
                        <h3 className='font-bold'> Top Akhs </h3>
                        <h4 className='text-gray-200'> 6 - 2 </h4>
                      </div>
                      <div className='w-14 text-center my-auto ml-1 text-2xl font-extrabold'> 98  </div>
                </div>
                <div className='flex my-auto justify-between items-center w-36 text-center '>

                  <WinArrowLeft className='h-4'/> 
                   FINAL 

                  <WinArrowRight className='h-4'/> 
                </div>
                <div className='w-2/3 flex flex-row-reverse justify-end'>
                      <div className='flex flex-col justify-center text-center'>
                        <h3 className='font-bold'> Springfield Rockets</h3>
                        <h4 className='text-gray-200'> 8 - 0 </h4>
                      </div>
                      <div className='w-14 text-center my-auto mr-1 text-2xl font-extrabold'> 122  </div>
                </div>  
              </div>
            <div className='border-t py-1 text-center border-gray-100 my-auto text-gray-200'> BOX SCORE </div>
          </div>
      </Container>
  )
}

export default Games 
