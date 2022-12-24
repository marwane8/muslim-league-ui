import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import Panel from '../../components/panel'

describe('Panel', () => {

    afterEach(() => {
    cleanup();
    })

    //TEST DESCRIPTION
    test("Panel default renders", () => {

        //ARRANGE
        render(
            <Panel title='Test Title'>
                <div data-testid='child' >
                    Test Child
                </div>
            </Panel>
        );
        
        //ACT

        //ASSERT

        const headingHTML= screen.getByRole('heading');
        const bodyHTML = screen.getByTestId('child');

        //title renders with an underline
        expect(headingHTML).toHaveTextContent('Test Title');
        expect(headingHTML).toHaveClass('border-b');

        //panel child node appears
        expect(bodyHTML).toHaveTextContent('Test Child');
    })


    //TEST DESCRIPTION
    test("Panel renders with no border", () => {

        //ARRANGE
        render(
            <Panel title='Test Title' removeBorder={true}>
                <div data-testid='child' >
                    Test Child
                </div>
            </Panel>
        );
        
        //ACT

        //ASSERT
        const headingHTML= screen.getByRole('heading');

        //title renders with no underline
        expect(headingHTML).not.toHaveClass('border-b');
    })
});
