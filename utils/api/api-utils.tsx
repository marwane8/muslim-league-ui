export {API_BASE_URL,API_CLIENT_URL,JWT_KEY}

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'

const API_CLIENT_URL: string | undefined = process.env.NEXT_PUBLIC_CLIENT_URL ||'http://localhost:8000'
const JWT_KEY: string | undefined = process.env.NEXT_PUBLIC_JWT_KEY || 'key1'

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