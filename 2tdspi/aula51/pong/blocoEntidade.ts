import { BlocoProps } from "./Bloco";

interface BlocoEntidade { 
    posicao : [number, number];
    tamanho : [number, number];
    ativo : boolean;
    renderer : React.FC<BlocoProps>;
}

export {BlocoEntidade};