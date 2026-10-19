import { Image } from "react-native"
import imgRaquete from "./assets/raquete_a.png";

interface RaqueteProps { 
    posicao : [number, number]
    tamanho : [number, number]
}

const Raquete : React.FC<RaqueteProps> = ( props ) => { 
    const {posicao, tamanho} = props;
    const [x, y] = posicao // [ 180, 400 ] 
    const [w, h] = tamanho // [ 180, 400 ] 
    return (
        <Image 
            source = {imgRaquete}
            style={{
                width: w,
                height: h,
                left: x,
                top: y,
              }}/>
    )
}

export {Raquete, RaqueteProps};