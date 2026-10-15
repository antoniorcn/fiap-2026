import { View } from "react-native"

interface BolaProps { 
    posicao : [number, number]
    tamanho : number
}

const Bola : React.FC<BolaProps> = ( props ) => { 
    const {posicao, tamanho} = props;
    const [x, y] = posicao // [ 180, 400 ] 
    return (
        <View style={{
                backgroundColor: "blue",
                width: tamanho,
                height: tamanho,
                left: x,
                top: y,
                borderRadius: tamanho/2,
              }}/>
    )
}

export {Bola, BolaProps};