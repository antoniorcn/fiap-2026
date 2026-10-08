import { RaqueteProps } from "./Raquete";

interface RaqueteEntity { 
    position : [number, number],
    direction : number,
    size : [number, number],
    speed : number,
    vidas : number,
    pontos : number,
    renderer : React.ComponentType<RaqueteProps>
};

export {RaqueteEntity};