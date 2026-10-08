import React from 'react';
import {Image} from 'react-native';
import imgRaquete from "./assets/raquete_a.png";
interface RaqueteProps { 
    position : [number, number];
    size : [number, number];
}

const Raquete : React.FC<RaqueteProps> = ( props : RaqueteProps ) => {
    const {position : pos, size} = props;
    return ( 
        <Image
            source={imgRaquete}
            style={{
                position: "absolute",
                top: pos[1],
                left: pos[0],
                width : size[0],
                height: size[1]
            }}
        />
    ) 
}

export {Raquete, RaqueteProps};