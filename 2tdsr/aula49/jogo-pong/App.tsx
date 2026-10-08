import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Ball } from './Ball';
import { GameEngine } from 'react-native-game-engine';
import { moveBall } from './moveBall';
import { Raquete } from './Raquete';
import { colision } from './colision';
import { moveRaquete } from './moveRaquete';

export default function App() {
  const raquete = useRef({ 
            position: [170, 550],
            direction: -1,
            size: [96, 16],
            renderer: Raquete,
            speed: 20.0,
            vidas : 5,
            pontos : 0
          });
  // const [pontos, setPontos] = useState<number>(raquete.current.pontos);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 30, backgroundColor: "cyan", flexDirection: "row", justifyContent:"space-between"}}>
        <Text>Vidas: {raquete.current.vidas}</Text>
        <Text>Pontos: {raquete.current.pontos}</Text>
      </View>
      <GameEngine style={{
          flex: 7, 
          backgroundColor: "black"}}
        systems={[moveBall, colision, moveRaquete]}
        entities = {{ 
          ball : {
            position: [100, 100],
            direction: [1, 1], 
            size: 25, speed: 1,
            renderer: Ball
          },
          raquete : raquete.current
        }}
      />
      <View style={{flex: 1, backgroundColor: "cyan", flexDirection: "row", justifyContent:"space-between"}}>
        <Button title="<<<<" onPress={()=>{
          raquete.current.direction = -1;
          // console.log(raquete.current);
        }}/>
        <Button title=">>>>" onPress={()=>{
          raquete.current.direction = 1;
          // console.log(raquete.current);
        }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
