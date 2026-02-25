import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{backgroundColor: "lightyellow",
      position: "absolute", top: 400, left: 100
    }}>
      <Text>prof Antonio Carvalho</Text>
      <Text>FIAP Paulista</Text>
      <Text>profantonio.neto@fiap.com.br</Text>
      <StatusBar style="auto" />
    </View>
  );
}
