import { RaqueteProps } from "./Raquete";

interface RaqueteEntidade { 
    posicao : [number, number];
    direcao : number;
    velocidade : number;
    tamanho : [number, number];
    renderer : React.Component<RaqueteProps>;
}

export {RaqueteEntidade};