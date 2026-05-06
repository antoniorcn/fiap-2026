import axios, { AxiosResponse } from 'axios';

const APIKey = process.env.EXPO_PUBLIC_API_KEY;

const apiAuth = axios.create({ 
    baseURL: "https://identitytoolkit.googleapis.com/v1"
});

/**
 * Retorna a string do token
*/
const loginApi = async (email : string, password : string) : Promise<string> => {     
    const obj =  {email, password, returnSecureToken: true};
    const url = `/accounts:signInWithPassword?key=${APIKey}`;

    const response : AxiosResponse<any, any> = await apiAuth.post(url, obj);
    return response.data.idToken;
}

export {loginApi}
