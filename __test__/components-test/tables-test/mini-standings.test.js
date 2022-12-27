import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import MiniStandings from '../../../components/tables/mini-standings'

describe('Mini Standings', () => {

    afterEach(() => {
        cleanup();
    })

    //TEST DESCRIPTION
    test("mini standings renders", () => {

        //ARRANGE
        const standings = [
            {
              id: 1,
              name: 'Team 1',
              wins: 8,
              loss: 0,
              points_for: 479,
              points_against: 344,
              rebounds_total: 228,
              diff: 135
            },
            {
              id: 2,
              name: 'Team 2',
              wins: 5,
              loss: 3,
              points_for: 348,
              points_against: 342,
              rebounds_total: 212,
              diff: 6
            },
            {
              id: 3,
              name: 'Team 3',
              wins: 0,
              loss: 8,
              points_for: 347,
              points_against: 455,
              rebounds_total: 223,
              diff: -108
            }
        ]

        render(
              <MiniStandings
                title='Test Standings'
                standings={standings}
              />
        );
        
        //ACT

        //ASSERT
        //table title is rendered
        const tableTitle = screen.getByTestId('title');
        expect(tableTitle).toHaveTextContent('Test Standings');

        //rows are rendered successfully 
        const row1Name = screen.getByTestId('team-name-0');
        const row1Wins = screen.getByTestId('team-wins-0');
        const row1Loss = screen.getByTestId('team-loss-0');
        const row1Pct = screen.getByTestId('team-pct-0');

        expect(row1Name).toHaveTextContent('Team 1');
        expect(row1Wins).toHaveTextContent('8');
        expect(row1Loss).toHaveTextContent('0');
        expect(row1Pct).toHaveTextContent('1.00');


        const row2Name = screen.getByTestId('team-name-1');
        const row2Wins = screen.getByTestId('team-wins-1');
        const row2Loss = screen.getByTestId('team-loss-1');
        const row2Pct = screen.getByTestId('team-pct-1');

        expect(row2Name).toHaveTextContent('Team 2');
        expect(row2Wins).toHaveTextContent('5');
        expect(row2Loss).toHaveTextContent('3');
        expect(row2Pct).toHaveTextContent('.625');

    
        const row3Name = screen.getByTestId('team-name-2');
        const row3Wins = screen.getByTestId('team-wins-2');
        const row3Loss = screen.getByTestId('team-loss-2');
        const row3Pct = screen.getByTestId('team-pct-2');

        expect(row3Name).toHaveTextContent('Team 3');
        expect(row3Wins).toHaveTextContent('0');
        expect(row3Loss).toHaveTextContent('8');
        expect(row3Pct).toHaveTextContent('0.00');
    })
});
