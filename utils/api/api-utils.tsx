export {SERVER_URL,CLIENT_URL,JWT_KEY}


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'

const CLIENT_URL: string  = process.env.NEXT_PUBLIC_CLIENT_URL ||'http://localhost:8000'
const JWT_KEY: string = process.env.NEXT_PUBLIC_JWT_KEY || 'key1'

export function credentialPostFetchOptions(userCredentials: FormData): RequestInit {
    const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        body: userCredentials
    }

    return options
}

export function makeAuthorizedRequestOptions(jwt_token: string): RequestInit {
    const options: RequestInit = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${jwt_token}`
        }
    }
    return options
}

export async function getRequest(query: string, useClient: boolean=false) {

    let url = SERVER_URL
    if (useClient) {
        url = CLIENT_URL
    }
    
    url = url + query
    const options: RequestInit =  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res  = await fetch(url,options);
        if (res.ok) {
        return res.json();
        }
    } catch (e) {
        console.log(e)
    }
    throw Error("Stat not found")
}