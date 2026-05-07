import { useState } from "react";
import { signInApi } from "../repository/remote/autenticacaoApi";
import { ToastAndroid } from "react-native";


const useAutenticacaoControl = (
    mensagem : (texto : string) => void
) => {
    const [token, setToken] = useState<string | null>( null );
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const signIn = async () => {
        try {
            const tkn = await signInApi( email, senha );
            setToken( tkn );
            mensagem("Signin realizado com sucesso");
        } catch ( err : any ) {
            mensagem("Erro ao fazer o SignIn: " + err.message);
            console.log( "Erro: ", err );
        }
        // .then( ()=> {} )
        // .catch( ()=> {})
    }

    const signUp = () => {
        // chamar o SignUp API 
    }

    return {
        signIn, signUp, 
        email, setEmail, 
        senha, setSenha,
        token
    }
}

export {useAutenticacaoControl};