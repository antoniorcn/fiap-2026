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
    if (colisaoPontoRect( p1, rectB ) || colisaoPontoRect(p2, rectB) ||
        colisaoPontoRect(p3, rectB) || colisaoPontoRect(p4, rectB)) { 
        return true;
    }

    p1 = { x : rectB.x, y : rectB.y };
    p2 = { x : rectB.x + rectB.w, y : rectB.y };
    p3 = { x : rectB.x + rectB.w, y : rectB.y + rectB.h };
    p4 = { x : rectB.x, y : rectB.y + rectB.h };
    if (colisaoPontoRect( p1, rectA ) || colisaoPontoRect(p2, rectA) ||
        colisaoPontoRect(p3, rectA) || colisaoPontoRect(p4, rectA)) { 
        return true;
    }
    return false;
} 

const testarColisoes = ( entidades : Entidades ) : Entidades => {
    const bola = entidades.bola;
    const raquete = entidades.raquete;

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
    if (colisaoRectRect(rectBola, rectRaquete)) { 
        console.log("B: ", rectBola, "\tR: ", rectRaquete);
        bola.direcao[1] = -1;
    }

    

    return entidades;
}

export {testarColisoes};