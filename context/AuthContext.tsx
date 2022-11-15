import { createContext, useContext} from 'react';
import { ReactNode } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Cookie from "js-cookie";
import { API_CLIENT_URL, credentialPostFetchOptions, makeAuthorizedRequestOptions } from '../utils/api/api-utils';


// Set Up and Export Functoins to use Auth Context
const AuthContext = createContext<Auth>({} as Auth);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // Login User 
    const login = async (userCredentials: FormData) => {
        console.log('Logging In')
        setIsLoading(true);
        const loginUrl = API_CLIENT_URL + '/api/v1/login';
        const loginRequestOptions = credentialPostFetchOptions(userCredentials);
        await handleLoginAPIRequest(loginUrl,loginRequestOptions) 
        setIsLoading(false);
    }

    // Logout User
    const logout = async () => {
        console.log('Logging Out');
        setIsLoading(true);
        const jwt = Cookie.get('token');
        const logoutUrl = API_CLIENT_URL + '/api/v1/logout';
        const logoutRequestOptions = makeAuthorizedRequestOptions(jwt)
        await handleLogoutAPIRequest(logoutUrl,logoutRequestOptions)
        setIsLoading(false);
    }
       
      
    async function handleLoginAPIRequest(url: string, requestOptions: RequestInit) {
        try {
            const response = await fetch(url,requestOptions);
            
            const data = await response.json();
            
            if (response.status === 200) {
                setError('');
                router.reload()
                router.push('/admin')
            } else if(response.status === 401){
                setError(data.detail);
            } else {
                setError("Server Request Error");
            }

        } catch (e) {
            setError("Server Error");
            console.error("Fetch Failed: ", e);
        }    
    }

    async function handleLogoutAPIRequest(url: string, requestOptions: RequestInit) {
         try {
            const response = await fetch(url,requestOptions);
            if (response.status === 200) {
                setError('');
                router.push('/')
            } else {
                setError("Server Request Error")
                console.error("Invalid Request")
            }
        } catch (e) {
            setError("Server Error");
            console.error("Fetch Failed: ", e);
        }     
    }
 
    // Output Context Values 
    const authValues = {
        isLoading,
        login,
        logout,
        error
    }

    return (
        <AuthContext.Provider value={authValues}>
            {children} 
        </AuthContext.Provider>
    )
}

//Types
export type Auth = {
    isLoading: boolean;
    login: (userCredentials: FormData) => Promise<void>;
    logout: () => void;
    error: string;
}

type Props = {
    children: ReactNode;
}

