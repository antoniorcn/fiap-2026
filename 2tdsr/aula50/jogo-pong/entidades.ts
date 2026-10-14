import { BallEntity } from "./ballEntity"
import { BlocoEntity } from "./blocoEntity"
import { RaqueteEntity } from "./raqueteEntity"

interface Entidades { 
    ball : BallEntity,
    raquete : RaqueteEntity,
    bloco : BlocoEntity
}

export { Entidades }