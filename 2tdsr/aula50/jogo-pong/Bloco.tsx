import React from 'react';
import {View} from 'react-native';
interface BlocoProps { 
    position : [number, number];
    size : number;
    color : string;
    ativo : boolean;
}

const Bloco : React.FC<BlocoProps> = ( props : BlocoProps ) => {
    const {position : pos, size, color, ativo} = props;
    if (ativo) { 
        return (<View 
                    style={{
                        position: "absolute",
                        top: pos[1],
                        left: pos[0],
                        width : size,
                        height: size / 2,
                        backgroundColor: color
                    }}
                />)
                } else  { 
                    return (<></>)
                }
   
}

export {Bloco, BlocoProps};