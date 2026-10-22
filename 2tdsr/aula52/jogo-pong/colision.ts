import { Entidades } from "./entidades";
import { Dimensions } from "react-native";

// const {width, height} = Dimensions.get("screen");
const height = 780;
const width = 380;

interface Rect { 
    x1 : number, 
    y1 : number, 
    x2 : number,
    y2 : number
}

const teste_colisao = (r1 : Rect, r2 : Rect) : boolean => { 
    const colisao_h = (r1.x1 >= r2.x1 && r1.x1 <= r2.x2) || (r1.x2 >= r2.x1 && r1.x2 <= r2.x2);
    const colisao_v = (r1.y1 >= r2.y1 && r1.y1 <= r2.y2) || (r1.y2 >= r2.y1 && r1.y2 <= r2.y2);
    return colisao_h && colisao_v
}

const colision = (entidades : Entidades, {dispatch} ) : Entidades => {

    const ball = entidades.ball;
    const raquete = entidades.raquete;
    const bloco = entidades.bloco;

    raquete.ciclos += 1;
    // console.log("Ciclos: ", raquete.ciclos);

    const ballRect : Rect = { 
        x1: ball.position[0],
        x2: ball.position[0] + ball.size,
        y1: ball.position[1],
        y2: ball.position[1] + ball.size
    }

    const raqueteRect : Rect = { 
        x1 : raquete.position[0],
        x2 : raquete.position[0] + raquete.size[0], 
        y1 : raquete.position[1],
        y2 : raquete.position[1] + raquete.size[1]
    }

    const blocoRect : Rect = { 
        x1: bloco.position[0],
        x2: bloco.position[0] + bloco.size,
        y1: bloco.position[1],
        y2: bloco.position[1] + bloco.size
    }
   
    let [dirX, dirY] = ball.direction;
    
    if (raquete.ciclos > 10 && teste_colisao(ballRect, raqueteRect)) {
        raquete.ciclos = 0;
        dirY = -1;
        raquete.pontos += 1;
        console.log("Colidiu: ", raquete);
        dispatch({tipo: "GANHOU_PONTOS", carga: { pontos: raquete.pontos }});
    }

    if (raquete.ciclos > 10 && teste_colisao(ballRect, blocoRect)) { 
        dirY = -1;
        raquete.pontos += 10;
        raquete.ciclos = 0;
        console.log("Colidiu com bloco:", raquete);
        bloco.ativo = false;
        dispatch({tipo: "GANHOU_PONTOS", carga: { pontos: raquete.pontos }});
    }

    ball.direction = [dirX, dirY];
    
    return entidades;
}

export {colision};