import {useState} from 'react';
import { loginApi } from '../repository/authRemoteRepository';

const useAuthControl = (mensagem : ( txt : string ) => void) => {

    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        try { 
            const idtoken = await loginApi( username, password );
            setToken( idtoken );
            mensagem("Logado com sucesso");
        } catch ( err : any ) {
            mensagem("Erro ao fazer o login: " + err.message );
        }
    }

    return {login, token, 
        username, setUsername,
        password, setPassword
    } 
}

export {useAuthControl};

