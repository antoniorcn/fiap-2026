import React from 'react';
import {View} from 'react-native';
interface BallProps { 
    position : [number, number];
    size : number;
}

const Ball : React.FC<BallProps> = ( props : BallProps ) => {
    const {position : pos, size} = props;
    return ( 
        <View 
            style={{
                position: "absolute",
                top: pos[1],
                left: pos[0],
                width : size,
                height: size,
                backgroundColor: "yellow",
                borderRadius: size / 2
            }}
        />
    ) 
}

export {Ball, BallProps};