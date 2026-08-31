import { useState, useEffect } from "react";
import { signInApi } from "../repository/remote/autenticacaoApi";
import { salvarAuth, limparAuth, carregarAuth, carregarAuthReturn } from "../repository/local/autenticacaoLocal";
import { ToastAndroid } from "react-native";


const useAutenticacaoControl = (
    mensagem : (texto : string) => void
) => {
    const [token, setToken] = useState<string | null>( null );
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    useEffect( ()=>{
        carregarAuth()
        .then(( obj : carregarAuthReturn | null) => {
            if (obj != null) { 
                setToken( obj.token );
                if (obj.username != null) {
                    setEmail( obj.username );
                }
            }
        })
        .catch( (err : any) => {
            console.log("Erro ao carregar a authenticacao do AsyncStorage");
        })
    }, []);


    const signIn = async () => {
        try {
            const tkn = await signInApi( email, senha );
            setToken( tkn );
            await salvarAuth( tkn, email );
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

    const logout = async () => {
        setToken( null );
        await limparAuth();
    }

    return {
        signIn, signUp, 
        email, setEmail, 
        senha, setSenha,
        token, logout
    }
}

export {useAutenticacaoControl};