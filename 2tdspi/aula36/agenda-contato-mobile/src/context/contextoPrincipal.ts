import { useContext, createContext } from "react";

interface ContextoInfo { 
    usuario : string | null;
    token : string | null;
    setToken : (tkn : string | null)=>void
}

const contextoInfoVazio : ContextoInfo = {
    usuario : null,
    token : null,
    setToken : ()=>{}
} 


const ContextoPrincipal = createContext(contextoInfoVazio);

export {contextoInfoVazio, ContextoPrincipal, ContextoInfo};