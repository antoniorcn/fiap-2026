import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [nome, setNome] = useState<string>("Joao Silva");
  return (
    <View style={styles.container}>
      <Text>Digite seu nome: </Text>
      <TextInput value={nome} 
        onChangeText={( texto ) => { 
          // const novoTexto = texto.toLowerCase();
          setNome( texto.toLowerCase().replace("a", "4") );
        }}/>
      <Button title="Trocar Nome" onPress={()=>{
        setNome("Jose Santos");
        console.log("Nome: ", nome);
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
