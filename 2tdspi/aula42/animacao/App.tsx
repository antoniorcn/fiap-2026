import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Button, Easing, StyleSheet, Text, useAnimatedValue, View } from 'react-native';

export default function App() {
  // const [posX, setPosX] = useState(0);
  const posX = useRef(new Animated.Value(0)).current;
  const escala = useAnimatedValue(1);
  const rotacao = useAnimatedValue(0);
  const paraDireita = Animated.timing(posX, {
    toValue : 300,
    duration: 2000,
    easing: Easing.out(Easing.elastic(1)),
    useNativeDriver: true,
  })
  const paraEsquerda = Animated.timing(posX, {
    toValue : 0,
    duration: 2000,
    useNativeDriver: true,
  });
  const aumentar = Animated.timing(escala, { 
    toValue: 2,
    duration: 1000,
    useNativeDriver: true
  });
  const diminuir = Animated.timing(escala, { 
    toValue: 0.5,
    duration: 1000,
    useNativeDriver: true
  });

  const girarDireita = Animated.timing(rotacao, { 
    toValue: 1,
    duration: 2000,
    useNativeDriver: true
  })

  const girarEsquerda = Animated.timing(rotacao, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: true
  });

  const rotInterpolada = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const cena1 = Animated.sequence([
    diminuir,
    girarDireita,
    aumentar,
    girarEsquerda
  ]);

  const cena2 = Animated.parallel([
    aumentar,
    girarDireita,
    Animated.delay(1000),
    paraDireita
  ]);

  const cena3 = Animated.stagger(200, [
    aumentar,
    girarDireita,
    paraDireita
  ]);  

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginTop: 30, backgroundColor: "lightyellow"}}>
        <View style={{flexDirection: "row"}}>
          <Button title="Esqueda" onPress={()=>{
            paraEsquerda.start();
          }}/>
          <Button title="Direita" onPress={()=>{
            paraDireita.start();
          }}/>
          <Button title="Aumentar" onPress={()=>{
            aumentar.start();
          }}/>
          <Button title="Diminuir" onPress={()=>{
            diminuir.start();
          }}/>
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="GirarEsquerda" onPress={()=>{
            girarEsquerda.start();
          }}/>               
          <Button title="GirarDireita" onPress={()=>{
            girarDireita.start();
          }}/>
        </View>
        <View style={{flexDirection: "row"}}>          
          <Button title="Cena 1" onPress={()=>{
            cena1.start();
          }}/>
          <Button title="Cena 2" onPress={()=>{
            cena2.start();
          }}/>
          <Button title="Cena 3" onPress={()=>{
            cena3.start();
          }}/> 
        </View>
      </View>
      <View style={{flex: 4, backgroundColor: "darkblue"}}>
        <Animated.View style={{
          backgroundColor: "red",
          width: 50,
          height: 50,
          transform: [
            {translateX: posX},
            {translateY: 390},
            {scale: escala},
            {rotateZ: rotInterpolada}
          ]
        }} />
      </View>
    </View>
  );
}

