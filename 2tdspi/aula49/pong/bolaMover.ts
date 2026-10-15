import { Entidades } from "./bolaEntidade";

const bolaMover = ( entidades : Entidades ) => { 

    const bola = entidades.bola;
    let [dirX, dirY] = bola.direcao;
    let [x, y] = bola.posicao;
    y = y + (dirY * bola.velocidade);
    x = x + (dirX * bola.velocidade);

    if (y > 780) { 
        dirY = -1;
    }
    if (y < 0) { 
        dirY = 1;
    }
    if (x > 380) { 
        dirX = -1;
    }
    if (x < 0) { 
        dirX = 1;
    }

    bola.posicao = [x, y];
    bola.direcao = [dirX, dirY];

    return entidades;

}

export {bolaMover};