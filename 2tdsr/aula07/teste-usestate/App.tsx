import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  let fiap = 12;
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text style={{fontSize: 32}}>{fiap}</Text>
      <Button title="+" onPress={()=>{
        fiap++;
        console.log( fiap );
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
