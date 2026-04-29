import {useEffect, useState} from 'react';
import { loginApi } from '../repository/authRemoteRepository';
import { carregarToken, salvarToken, apagarToken } from '../repository/authLocalRepository';

const useAuthControl = (mensagem : ( txt : string ) => void) => {

    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(()=>{
        carregarToken()
        .then(( strTkn : string | null ) => {
            setToken( strTkn );
        })
        .catch(()=>{});
    }, []);

    const login = async () => {
        try { 
            const idtoken = await loginApi( username, password );
            setToken( idtoken );
            mensagem("Logado com sucesso");
            if (!salvarToken( idtoken )) {
                mensagem("Token não pode ser salvo no AsyncStorage")
            }
        } catch ( err : any ) {
            mensagem("Erro ao fazer o login: " + err.message );
        }
    }

    const logout = () => { 
        setToken(null);
        apagarToken();
    }

    return {login, logout, token, 
        username, setUsername,
        password, setPassword
    } 
}

export {useAuthControl};

