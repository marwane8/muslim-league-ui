import {render, screen, cleanup, fireEvent, getByDisplayValue} from '@testing-library/react'
import '@testing-library/jest-dom'

import DropDown from '../../components/widgets/drop-down'

describe('Drop Down', () => {

    afterEach(() => {
        cleanup();
    })

    //TEST DESCRIPTION
    test("drop down card renders", () => {

        //ARRANGE
        let items = [{key: 1, value: 'Item 1'},{key: 2, value: 'Item 2'},{key: 3, value: 'Item 3'}];
        const handleItemChange = jest.fn();

        render(
            <DropDown 
                title='ITEM LIST'
                options={items}
                curentOption={2} 
                changeOption={handleItemChange}
            />
        );
        
        //ACT
        const select = screen.getByRole('combobox');
        fireEvent.change(select, {target: {value: 3}});


        //ASSERT

        //expect change function to be called
        expect(handleItemChange).toHaveBeenCalledTimes(1);
        //expect the proper value is selected
        expect(select.value).toEqual("3");
        //checks drops down title
        const title = screen.getByRole('heading');
        expect(title).toHaveTextContent('ITEM LIST');
    })
});
