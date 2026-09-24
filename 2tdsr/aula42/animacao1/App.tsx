import { useRef} from 'react';
import { Animated, Button, View } from 'react-native';
export default function App() {
  const transX = useRef(new Animated.Value(0)).current;
  const transY = useRef(new Animated.Value(0)).current;
  const animacao = Animated.sequence( [
        Animated.timing(transX, {
            useNativeDriver: true,
            toValue: 300,
            duration: 100,
        })
  ]);
  return (
    <View style={{flex: 1, marginTop: 25, backgroundColor: '#000'}}>
      <View style={{flex: 1}}>
          <Button title="Animar" onPress={()=>animacao.start()} />
      </View>
      <Animated.View style={{flex: 5, marginTop: 50, position: "absolute",
        left: 0, top: 0, width: 50, height: 50,
        backgroundColor: "cyan", transform: [ {translateX: transX}, {translateY: transY} ]
      }}/>
    </View>
  );
}