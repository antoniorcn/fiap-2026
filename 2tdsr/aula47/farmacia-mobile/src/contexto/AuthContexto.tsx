import { createContext } from "react";

interface AuthInfo { 
    token : string | null;
    setToken : ( tkn : string ) => void
};

const authInfoVazio : AuthInfo = {
    token : null,
    setToken : ()=>null
};


const AuthContexto = createContext(authInfoVazio);

export {AuthContexto, AuthInfo, authInfoVazio}