import { createContext } from "react";

interface MeuContextoStructure { 
    token : string | null;
    mensagem : ( txt : string ) => void;
    estilos : any;
}

const MeuContexto = createContext<MeuContextoStructure>(
    {
        token : null,
        mensagem : ( txt : string ) => {},
        estilos : {}
    }
);

export { MeuContexto, MeuContextoStructure };

