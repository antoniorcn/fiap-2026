import { Entidades } from "./entidades";

const bolaMover = ( entidades : Entidades, { dispatch }  ) => { 

    const bola = entidades.bola;
    const jogo = entidades.jogo;
    let [dirX, dirY] = bola.direcao;
    let [x, y] = bola.posicao;
    y = y + (dirY * bola.velocidade);
    x = x + (dirX * bola.velocidade);

    if (y > 780) { 
        x = 180
        y = 20
        dirY = 1
        jogo.vidas = jogo.vidas - 1;
        dispatch({"tipo": "perdeuVida", "carga": jogo.vidas});
        if (jogo.vidas <= 0) { 
            jogo.vidas = 0;
            dispatch({"tipo": "mudancaEstado", "carga": "gameover"});
        }
        // console.log( jogo );
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