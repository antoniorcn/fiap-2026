import { Entidades } from "./entidades";

interface Ponto { 
    x : number;
    y : number;
}

interface Rect { 
    x : number;
    y : number;
    w : number;
    h : number;
}

const colisaoPontoRect = ( ponto : Ponto, rect : Rect ) : boolean =>  { 
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = x1 + rect.w;
  const y2 = y1 + rect.h;
  if (ponto.x >= x1 && ponto.x <= x2 && ponto.y >= y1 && ponto.y <= y2) {
    return true;
  } else { 
    return false;
  }
}

const colisaoRectRect = ( rectA : Rect, rectB : Rect ) : boolean => {
    let p1 : Ponto = { x : rectA.x, y : rectA.y };
    let p2 : Ponto = { x : rectA.x + rectA.w, y : rectA.y };
    let p3 : Ponto = { x : rectA.x + rectA.w, y : rectA.y + rectA.h };
    let p4 : Ponto = { x : rectA.x, y : rectA.y + rectA.h };
    if (colisaoPontoRect(p1, rectB ) || colisaoPontoRect(p2, rectB) ||
        colisaoPontoRect(p3, rectB) || colisaoPontoRect(p4, rectB)) { 
        return true;
    }

    p1 = { x : rectB.x, y : rectB.y };
    p2 = { x : rectB.x + rectB.w, y : rectB.y };
    p3 = { x : rectB.x + rectB.w, y : rectB.y + rectB.h };
    p4 = { x : rectB.x, y : rectB.y + rectB.h };
    // const colP1 = colisaoPontoRect(p1, rectA);
    // const colP2 = colisaoPontoRect(p2, rectA);
    // const colP3 = colisaoPontoRect(p3, rectA);
    // const colP4 = colisaoPontoRect(p4, rectA);
    if (colisaoPontoRect( p1, rectA ) || colisaoPontoRect(p2, rectA) ||
        colisaoPontoRect(p3, rectA) || colisaoPontoRect(p4, rectA)) { 
        return true;
    }

    return false;

    // if (colP1 && !colP2 && !colP3 && !colP4) { 
    //     return "bottom-right"
    // } else if (colP1 && colP2 && !colP3 && !colP4) { 
    //     return "bottom"
    // } else if (colP1 && !colP2 && colP3 && !colP4) { 
    //     return "right"
    // } else if (!colP1 && colP2 && colP3 && !colP4) { 
    //     return "left"
    // } else if (!colP1 && colP2 && !colP3 && !colP4) { 
    //     return "bottom-left"
    // } else if (!colP1 && !colP2 && !colP3 && colP4) { 
    //     return "top-left"
    // } else if (!colP1 && !colP2 && colP3 && colP4) { 
    //     return "top"
    // } else if (!colP1 && !colP2 && colP3 && !colP4) { 
    //     return "top-right"
    // } else { 
    //     return ""
    // }
} 

const testarColisoes = ( entidades : Entidades, {dispatch} ) : Entidades => {
    const bola = entidades.bola;
    const raquete = entidades.raquete;
    const bloco = entidades.bloco;
    const jogo = entidades.jogo;

    const rectBola : Rect = {
        x : bola.posicao[0],
        y : bola.posicao[1],
        w : bola.tamanho / 2,
        h : bola.tamanho / 2
    } 

    const rectRaquete : Rect = {
        x : raquete.posicao[0],
        y : raquete.posicao[1],
        w : raquete.tamanho[0],
        h : raquete.tamanho[1]
    } 

    const rectBloco : Rect = {
        x : bloco.posicao[0],
        y : bloco.posicao[1],
        w : bloco.tamanho[0],
        h : bloco.tamanho[1]
    } 

    let [dirX, dirY] = bola.direcao;

    // const tipoColisao = colisaoRectRect(rectBola, rectRaquete);
    // if (tipoColisao !== "") { 
    //     if (tipoColisao in ["bottom", "bottom-left", "bottom-right"] ) { 
    //         dirY = -1;
    //     }
    //     if (tipoColisao in ["top", "top-left", "top-right"] ) { 
    //         dirY = 1;
    //     }
    //     if (tipoColisao in ["left", "top-left", "bottom-left"] ) { 
    //         dirX = -1;
    //     }
    //     if (tipoColisao in ["right", "top-right", "bottom-right"] ) { 
    //         dirX = 1;
    //     }
    //     console.log("Colisão Tipo: ", tipoColisao, "\tDir inicial: ", bola.direcao, "\tDir Atual: ", [dirX, dirY]);
        
    if (colisaoRectRect(rectRaquete, rectBola)) {
        jogo.pontos = jogo.pontos + 1;
        bola.direcao[1] = -1
        dispatch({tipo: "ganhouPonto", carga: jogo.pontos});
        if (jogo.pontos >= 1000) { 
            dispatch({tipo: "mudancaEstado", carga: "vitoria"});
        }
    }

    if (colisaoRectRect(rectBloco, rectBola)) {
        jogo.pontos = jogo.pontos + 2;
        bola.direcao[1] = -1
        dispatch({tipo: "ganhouPonto", carga: jogo.pontos});
    } 

    return entidades;
}

export {testarColisoes};