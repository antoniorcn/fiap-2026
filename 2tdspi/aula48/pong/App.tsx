import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Entidades } from './bolaEntidade';
import { Bola } from './Bola';
import { bolaMover } from './bolaMover';

export default function App() {
  const entidades : Entidades = {
    bola : {
      posicao: [180, 400],
      direcao: [1, 1],
      velocidade: 2,
      tamanho: 40,
      renderer : Bola
    }
  }
  return (
    <View style={styles.container}>
      <GameEngine 
        systems={[bolaMover]}
        style={{flex: 1}} 
        entities={entidades}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
