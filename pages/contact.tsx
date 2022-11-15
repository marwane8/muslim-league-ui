import Header from '../components/header'
import Container from '../components/container'



const Contact = () => {
  return (
      <Container>
        <Header title='Contact Us | Muslim League CT'/> 
        <h2 className='m-8 text-2xl font-bold text-center md:text-4xl text-primary'> Contact Us </h2>
        <div className='p-5 m-5 text-center rounded-xl bg-gray'>
            <h3 className='text-xl font-bold'> Vale Sports Club</h3>
            <h4> Middletown, CT 06457 </h4>
            <p className='pt-5'> Please direct all questions and concerns to our email to: </p>
            <p className='font-bold'> muslimleaguect@gmail.com</p>
       </div>
      </Container>
  )
}

export default Contact 
