import { StyleSheet, Text, View } from 'react-native';
import { Ball } from './Ball';
import { GameEngine } from 'react-native-game-engine';
import { moveBall } from './moveBall';

export default function App() {
  return (
    <View style={styles.container}>
      <GameEngine style={{
          flex: 1, 
          backgroundColor: "black"}}
        systems={[moveBall]}
        entities = {{ 
          ball : {  position: [100, 100],
                    x: 100, y: 100,
                    direction: [0, 1], 
                    size: 50, speed: 10,
                    renderer: Ball }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
