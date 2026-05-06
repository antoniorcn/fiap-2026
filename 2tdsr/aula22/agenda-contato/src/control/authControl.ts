import {useEffect, useState} from 'react';
import { loginApi } from '../repository/authRemoteRepository';
import { carregarToken, salvarToken, apagarToken } from '../repository/authLocalRepository';
import { useColorScheme } from 'react-native';

interface AuthControl {
    login : () => void;
    logout : () => void;
    token : string | null;
    isDark : boolean;
    toggleScreenMode : () => void;
    username : string;
    setUsername : ( username : string ) => void;
    password : string;
    setPassword : ( password : string ) => void;
}
 
const useAuthControl = (
    mensagem : ( txt : string ) => void
) : AuthControl => {
    const screenMode = useColorScheme();
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isDark, setDark] = useState<boolean>( screenMode === "dark");

    const toggleScreenMode = () => { 
        setDark(!isDark);
    }


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
        password, setPassword,
        isDark, toggleScreenMode
    } 
}

export {useAuthControl, AuthControl};

