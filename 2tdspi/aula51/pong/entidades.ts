import { BlocoEntidade } from "./blocoEntidade"
import { BolaEntidade } from "./bolaEntidade"
import { JogoEntidade } from "./jogoEntidade"
import { RaqueteEntidade } from "./raqueteEntidade"

interface Entidades { 
    bola : BolaEntidade,
    raquete : RaqueteEntidade,
    jogo : JogoEntidade,
    bloco : BlocoEntidade
}

export { Entidades }