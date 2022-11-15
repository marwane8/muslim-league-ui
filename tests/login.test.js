import {fireEvent, render, act} from '@testing-library/react'
import '@testing-library/jest-dom'

import Login from '../pages/login'
import { useAuth } from '../context/AuthContext';



jest.mock('../context/AuthContext');

describe('LogIn', () => {
    
    let expectedRedirect;
    beforeEach(() => {
        expectedRedirect = jest.fn();
    });

    test("Login Redirects on Success" , async () => {

        //ARRANGE
        useAuth.mockReturnValue({
            isLoading: false,
            login: expectedRedirect,
            error: false 
        });

        const {getByLabelText,getByRole} = render(<Login/>);
        const username = getByLabelText(/username/i);
        const password = getByLabelText(/password/i);
        const signInButton = getByRole('button', {name: /sign in/i})

        //ACT
        await act(async () => {
            fireEvent.change(username, {target: {value: 'user'}});
            fireEvent.change(password, {target: {value: 'user'}});
            fireEvent.click(signInButton);
        })
       
        //ASSERT
        expect(expectedRedirect).toHaveBeenCalledTimes(1);
    });


    test("SignIn is disabled while loading" , () => {
        //ARRANGE
         useAuth.mockReturnValue({
            isLoading: true,
            login: expectedRedirect,
            error: false 
        });

        const {getByRole} = render(<Login/>);
        const signInButton = getByRole('button', {name: /sign in/i})

        //ASSERT
        expect(signInButton).toBeDisabled();
    });

    test("Error appears on SignIn Failure" , async () => {

        //ARRANGE
        const expectedLoginFailure = jest.fn();
        const errorMessage = "Invalid Username or Password"
        useAuth.mockReturnValue({
            isLoading: false,
            login: expectedLoginFailure,
            error: errorMessage 
        });

        const {getByLabelText,getByRole,getByText} = render(<Login/>);
        const username = getByLabelText(/username/i);
        const password = getByLabelText(/password/i);
        const signInButton = getByRole('button', {name: /sign in/i})

        //ACT
        fireEvent.change(username, {target: {value: 'user'}});
        fireEvent.change(password, {target: {value: 'user'}});
        fireEvent.click(signInButton);

        const errorAlert = await getByText(errorMessage) 
        //ASSERT
        expect(expectedLoginFailure).toHaveBeenCalledTimes(1);
        expect(errorAlert).toBeInTheDocument();
    });
});
