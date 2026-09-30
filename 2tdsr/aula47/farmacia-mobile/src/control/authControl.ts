import {useContext, useState} from 'react';
import { loginApi } from '../repository/authRepository';
import { AuthContexto } from '../contexto/AuthContexto';

const useAuthControl = () => { 
    const {token, setToken} = useContext(AuthContexto);
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const login = async () => { 
        const tkn = await loginApi(email, senha);
        setToken( tkn );
    }

    return { 
        email, setEmail,
        senha, setSenha,
        login
    }
}

export {useAuthControl};