import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const transX = useRef(new Animated.Value(0)).current;
  const transRot = useRef(new Animated.Value(0)).current;
  const red = useRef(new Animated.Value(0)).current;
  const green = useRef(new Animated.Value(0)).current;
  const blue = useRef(new Animated.Value(0)).current;
  const [rgb, setRgb] = useState({ red: 0, green: 0, blue: 0 });

  useEffect(() => {
    const redListener = red.addListener(({ value }) => {
      setRgb((current) => ({ ...current, red: Math.round(value) }));
    });
    const greenListener = green.addListener(({ value }) => {
      setRgb((current) => ({ ...current, green: Math.round(value) }));
    });
    const blueListener = blue.addListener(({ value }) => {
      setRgb((current) => ({ ...current, blue: Math.round(value) }));
    });

    return () => {
      red.removeListener(redListener);
      green.removeListener(greenListener);
      blue.removeListener(blueListener);
    };
  }, [blue, green, red]);

  const animacaoDireita = Animated.timing(transX, {
    useNativeDriver: true,
    toValue: 300,
    duration: 3000,
    easing: Easing.inOut(Easing.circle)
  });
  const animacaoEsquerda = Animated.timing(transX, {
    useNativeDriver: true,
    toValue: 0,
    duration: 3000,
    easing: Easing.inOut(Easing.circle)
  });
  const girarDireita = Animated.timing(transRot, {
    useNativeDriver: true,
    toValue: 360,
    duration: 3000
  });
  const girarEsquerda = Animated.timing(transRot, {
    useNativeDriver: true,
    toValue: 0,
    duration: 3000
  });
  
  const maisRed = Animated.timing(red, {
    useNativeDriver: false,
    toValue: 255,
    duration: 1000
  });
  const menosRed = Animated.timing(red, {
    useNativeDriver: false,
    toValue: 0,
    duration: 1000
  });

  const maisGreen = Animated.timing(green, {
    useNativeDriver: false,
    toValue: 255,
    duration: 1000
  });
  const menosGreen = Animated.timing(green, {
    useNativeDriver: false,
    toValue: 0,
    duration: 1000
  });

  const maisBlue = Animated.timing(blue, {
    useNativeDriver: false,
    toValue: 255,
    duration: 1000
  });
  const menosBlue = Animated.timing(blue, {
    useNativeDriver: false,
    toValue: 0,
    duration: 1000
  });  
  
  const rotation = transRot.interpolate({
    inputRange:[0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;


  const girarMoverDireita = Animated.parallel(
    [animacaoDireita, girarDireita]
  );
  const girarMoverEsquerda = Animated.parallel(
    [animacaoEsquerda, girarEsquerda]
  );  
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row"}}>
          <Button title="Esquerda" onPress={()=>animacaoEsquerda.start()} />
          <Button title="Direita" onPress={()=>animacaoDireita.start()} />
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="Girar Esquerda" onPress={()=>girarEsquerda.start()} />
          <Button title="Girar Direita" onPress={()=>girarDireita.start()} />
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="Girar Mover Esquerda" onPress={()=>girarMoverEsquerda.start()} />
          <Button title="Girar Mover Direita" onPress={()=>girarMoverDireita.start()} />
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="-" color="red" onPress={() => menosRed.start()} />
          <Text>{rgb.red}</Text>
          <Button title="+" color="red" onPress={() => maisRed.start()} />
          <Button title="-" color="green" onPress={() => menosGreen.start()} />
          <Text>{rgb.green}</Text>
          <Button title="+" color="green" onPress={() => maisGreen.start()} />
          <Button title="-" color="blue" onPress={() => menosBlue.start()} />
          <Text>{rgb.blue}</Text>
          <Button title="+" color="blue" onPress={() => maisBlue.start()} />
        </View>
      </View>
      <Animated.View style={{
        flex: 1,
        marginTop:100,
        position: "absolute",
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        backgroundColor,
        transform: [
          {translateX: transX},
          {translateY: 100},
          {rotateZ: rotation},
          {scale: 1}
        ]
      }}><Text>Ola mundo</Text></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#0ff'
  },
});
