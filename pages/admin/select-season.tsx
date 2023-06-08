

import Header from '../../components/header'
import Container from '../../components/container'
import Panel from '../../components/panel'


const About = () => {
  return (
      <Container>
        <Header title='About Us | Muslim League CT'/> 
          <Panel
            title='Muslim League CT' >
            <p> 
            Muslim League CT is an inturmural basketball league for Muslims in Connecticut. 
            Founded in 2020, our league is devoted to giving the community a chance to come together as brothers and play.
            </p>
            <p className='py-2'> 
            <span className='font-bold'> Our Mission </span> is to unite the Ummah through sports! 
            </p>
          </Panel>
      </Container>
  )
}

export default About 
