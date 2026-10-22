import { Image } from "react-native"
import imgBloco from "./assets/bloco_red.png";

interface BlocoProps { 
    posicao : [number, number]
    tamanho : [number, number]
}

const Bloco : React.FC<BlocoProps> = ( props ) => { 
    const {posicao, tamanho} = props;
    const [x, y] = posicao // [ 180, 400 ] 
    const [w, h] = tamanho // [ 180, 400 ] 
    return (
        <Image 
            source = {imgBloco}
            style={{
                width: w,
                height: h,
                left: x,
                top: y,
              }}/>
    )
}

export {Bloco, BlocoProps};