import { Entidades } from "./entidades";

const raqueteMover = ( entidades : Entidades ) => { 

    const raquete = entidades.raquete;
    let [x, y] = raquete.posicao;
    const [w, h] = raquete.tamanho;

    x = x + (raquete.direcao * raquete.velocidade); // [180, 400]

    if (x < 0) { 
        x = 0;
    }

    if (x + w  > 390) { 
        x = 390 - w;
    }

    raquete.posicao = [x, y];
    return entidades;

}

export { raqueteMover };