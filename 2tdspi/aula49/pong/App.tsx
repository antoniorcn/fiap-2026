import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Entidades } from './bolaEntidade';
import { Bola } from './Bola';
import { Raquete } from './Raquete';
import { bolaMover } from './bolaMover';
import { useRef } from 'react';
import { raqueteMover } from './raqueteMover';
import { testarColisoes } from './testeColisao';

export default function App() {

  const raqueteObj = useRef({
      posicao: [150, 650],
      tamanho: [104, 24],
      direcao: 0,
      velocidade: 0,
      renderer : Raquete
    });

  const entidades : Entidades = {
    bola : {
      posicao: [180, 400],
      direcao: [1, 1],
      velocidade: 2,
      tamanho: 40,
      renderer : Bola
    },
    raquete : raqueteObj.current
  }
  return (
    <View style={styles.container}>
      <GameEngine 
        systems={[bolaMover, raqueteMover, testarColisoes]}
        style={{flex: 10}} 
        entities={entidades}
      />
      <View style={{flex: 1, 
                    flexDirection: "row",
                    justifyContent: "space-between"}} >
        <Button title="<<<" onPress={()=>{
          raqueteObj.current.direcao = -1;
          console.log("Raquete: ", raqueteObj);
        }} />
        <Button title="OOO" onPress={()=>{
          raqueteObj.current.direcao = 0;
          console.log("Raquete: ", raqueteObj);
        }} />
        <Button title=">>>" onPress={()=>{
          raqueteObj.current.direcao = 1;
          console.log("Raquete: ", raqueteObj);
        }} />
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
