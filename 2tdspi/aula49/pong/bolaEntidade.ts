import { BolaProps } from "./Bola";

interface BolaEntidade { 
    posicao : [number, number];
    direcao : [number, number];
    velocidade : number;
    tamanho : number;
    renderer : React.Component<BolaProps>;
}

export {BolaEntidade};