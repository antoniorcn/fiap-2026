import { Entidades } from "./entidades";
import { Dimensions } from "react-native";

// const {width, height} = Dimensions.get("screen");
const height = 780;
const width = 380;

const colision = (entidades : Entidades) : Entidades => {

    const ball = entidades.ball;

    const raquete = entidades.raquete;

    const x1 = ball.position[0];
    const x2 = x1 + ball.size;
    const y1 = ball.position[1];
    const y2 = y1 + ball.size;

    const a1 = raquete.position[0];
    const a2 = a1 + raquete.size[0];    
    const b1 = raquete.position[1];
    const b2 = b1 + raquete.size[1];

    const colisao_h = (x1 >= a1 && x1 <= a2) || (x2 >= a1 && x2 <= a2);
    const colisao_v = (y1 >= b1 && y1 <= b2) || (y2 >= b1 && y2 <= b2);
    
    let [dirX, dirY] = ball.direction;
    
    if (colisao_h && colisao_v) { 
        dirY = -1;
        raquete.pontos += 1;
        console.log("Colidiu ... Pontos: ", raquete.pontos);
    }

    ball.direction = [dirX, dirY];
    
    return entidades;
}

export {colision};