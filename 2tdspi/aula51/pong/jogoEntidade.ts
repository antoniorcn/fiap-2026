interface JogoEntidade { 
    pontos : number;
    vidas : number;
    estado : "jogando" | "menu" | "gameover" | "vitoria"
}

export {JogoEntidade}