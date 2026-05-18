import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_APIKEY;


const signInApi = async ( email : string, senha : string ) : Promise<string | null> => {
    const obj = {email, password : senha, returnSecureToken : true};
    console.log("Objeto de autenticação: ", obj);
    console.log("API Key: ", apiKey);
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, 
        obj
    );
    console.log("Resposta do SignIn: ", response.data);
    return response.data.idToken;
}

export {signInApi};