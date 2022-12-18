import Header from '../components/header'
import Container from '../components/container'

import Panel from '../components/panel'


const Contact = () => {
  return (
      <Container>

        <Header title='Contact Us | Muslim League CT'/> 
        <Panel title='Contact Us'>
        <div className='m-5 text-center'>
            <h3 className='text-xl font-bold'> Vale Sports Club</h3>
            <h4> Middletown, CT 06457 </h4>
            <p className='pt-5'> Please direct all questions and concerns to our email to: </p>
            <p className='font-bold'> muslimleaguect@gmail.com</p>
       </div>

        </Panel>
      </Container>
  )
}

export default Contact 
