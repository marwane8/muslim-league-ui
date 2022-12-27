import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import ImageCard from '../../components/widgets/image-card'
import championpic from '/public/champions.jpg' 

describe('Image Card', () => {

    afterEach(() => {
    cleanup();
    })

    //TEST DESCRIPTION
    test("Image card renders", () => {

        //ARRANGE
        const testDate = 'January 1st, 1990';

        render(
            <ImageCard 
              title='Championship Title'
              src={championpic}
              alt='Picture of Championship Team'
              date={testDate}>
            <p data-testid='caption'> 
                Card Caption
            </p>
            </ImageCard>
        );
        
        //ACT

        //ASSERT

        //checks that image exsists and alt is rendered
        const image= screen.getByRole('img');
        expect(image.alt).toEqual('Picture of Championship Team');

        //checks caption  is rendered
        const captionHTML = screen.getByTestId('caption');
        expect(captionHTML).toHaveTextContent('Card Caption');

        //checks date is rendered 
        const dateHTML = screen.getByTestId('date');
        expect(dateHTML).toHaveTextContent(testDate);
    })
});
