import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{display: "contents", position: "absolute"}}>
      <Text style={{backgroundColor: "navy", margin: 5, 
        color: "white", width: 50, height: 50}}>1</Text>
      <Text style={{backgroundColor: "navy", margin: 5, left: 100, top: 0,
        color: "white", width: 50, height: 50}}>2</Text>
      <Text style={{backgroundColor: "navy", margin: 5, left: 200, top: 0,
        color: "white", width: 50, height: 50}}>3</Text>
    </View>
  );
}

