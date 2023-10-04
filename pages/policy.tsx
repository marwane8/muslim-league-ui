import Header from '../components/header'
import Container from '../components/container'
import Panel from '../components/panel'

import rulesUrl from '/public/docs/RULES.pdf'
import policyUrl from '/public/docs/POLICY.pdf'

const Policy = () => {

  const openRules = () => {
    window.open(rulesUrl, '_blank');
  };

  const openPolicy = () => {
    window.open(policyUrl, '_blank');
  };


  return (
      <Container>
        <Header title='Policy | Muslim League CT'/> 
        <Panel title='League Policy'>
          <div className='m-5 text-center'>

              <p> The following policy and rules are implemented for team registration and all offical games. </p>
              
              <div className='flex justify-between py-3 m-auto w-36'>
                <button className="px-2 py-1 font-bold text-white bg-black rounded-md"
                  onClick={openPolicy}>
                    POLICY
                  </button>

                <button className="px-2 py-1 font-bold text-white bg-black rounded-md"
                  onClick={openRules}>
                    RULES
                  </button>

              </div>
          </div>

        </Panel>
      </Container>
  );
}

export default Policy 
