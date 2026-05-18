import {createContext} from 'react';

interface ContextoInfo { 
    token : string | null;
    username : string | null;
    logout : () => void;
}

const valorPadrao : ContextoInfo = {
    token : null,
    username : null,
    logout : ()=>{}
}

const MeuContexto = createContext(valorPadrao);

export {MeuContexto, ContextoInfo};