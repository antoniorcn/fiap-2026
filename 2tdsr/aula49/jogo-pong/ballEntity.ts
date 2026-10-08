import { BallProps } from "./Ball";

interface BallEntity { 
    position : [number, number],
    direction : [number, number],
    size : number,
    speed : number, 
    renderer : React.ComponentType<BallProps>
};

export {BallEntity};