import { BlocoProps } from "./Bloco";

interface BlocoEntity { 
    position : [number, number],
    size : number,
    color : string,
    ativo : boolean,
    renderer : React.ComponentType<BlocoProps>
};

export {BlocoEntity};