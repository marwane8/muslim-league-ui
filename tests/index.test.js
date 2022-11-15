import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '../pages/index'

//TEST DESCRIPTION
test("Homepage says: 'Welcome to the Muslim League'", () => {

    //ARRANGE
    render(<Home/>)
    
    //ACT

    //ASSERT
    expect(screen.getByRole('heading')).toHaveTextContent('The Muslim League')

})